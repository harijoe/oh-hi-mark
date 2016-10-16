export const IcurrentTabIdSelector = state => state.current.getIn(['tab', 'id']);
export const IcurrentTabSelector = state => state.current.get('tab');
export const IextractionSelector = state => state.current.get('extraction');
export const IsavedSelector = state => state.current.get('saved');
