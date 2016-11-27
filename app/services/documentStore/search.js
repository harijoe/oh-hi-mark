import elasticlunr from 'elasticlunr';
import _ from 'lodash';

elasticlunr.tokenizer.setSeperator(/[\s\-\/.]+/)
elasticlunr.clearStopWords();
elasticlunr.stemmer = str => str;
delete elasticlunr.Pipeline.registeredFunctions['stemmer'];
elasticlunr.Pipeline.registerFunction(elasticlunr.stemmer, 'stemmer');

const config = {
  bool: 'OR',
  expand: true,
  fields: {
    title: { boost: 10 },
    description: { boost: 5 },
    content: { boost: 1 },
    url: { boost: 10 },
  }
};

export default class Search
{
  constructor(documentStore = null) {
    this.init(documentStore);
    documentStore.addListener(() => this.init(documentStore));
  }

  init = (documentStore) => {
    this.documentStore = documentStore;
    // this.fuse = new Fuse(Object.values(documentStore.getDocuments()), options);
    this.idx = elasticlunr((builder) => {
      builder.addField('id');
      builder.addField('title');
      builder.addField('content');
      builder.addField('description');
      builder.addField('url');
    });

    Object.values(documentStore.getDocuments()).map(doc => this.idx.addDoc(doc));
  }

  search = rawQuery => {
    // OPTIM: Prevent result stuttering
    const query = rawQuery
      .split(' ')
      .filter(word => rawQuery.length === 1 || word.length > 1)
      .join(' ')
    ;

    const rawResults = this.idx.search(query.trim(), config);

    if (rawResults.length === 0) { return []; }

    // OPTIM: Remove unrelevant results
    const maxScore = rawResults[0].score;
    const results = rawResults.filter(res => res.score > maxScore / 8);

    // retrieve the docs and inject score in it
    // let data = _.pick(this.documentStore.getDocuments(), results.map(res => res.ref));
    // results.map(res => data[res.ref].score = res.score);

    // For logging purposes
    // data = Object.values(data).map(val => _.pick(val, ['title', 'score']));
    // data.map(el => console.log(el.title, el.score));

    return _.sortBy(Object.values(_.pick(
      this.documentStore.getDocuments(), results.map(res => res.ref))
    ), 'score').reverse();
  }
}
