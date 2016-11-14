import React from 'react';
import { StyleSheet, css } from 'aphrodite';

function BottomRight() {
  return (<p className={css(styles.productPain)}>
    <a
      className={css(styles.productPainLink, styles.bottomText)}
      href="https://productpains.com/product/oh-hi-mark"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        className={css(styles.productPainLogo)}
        alt="productpains.com"
        src="img/productpain.png"
      />
      A feature is missing ? Vote for the next feature!
    </a>
  </p>);
}

const styles = StyleSheet.create({
  productPain: {
    textAlign: 'right',
    display: 'inline-block',
    width: '50%',
    fontStyle: 'italic',
    marginBottom: 0,
  },
  productPainLink: {
    color: 'grey',
    marginRight: 10,
  },
  productPainLogo: {
    height: 25,
    verticalAlign: 'middle',
  },
  bottomText: {
    textDecoration: 'inherit',
    ':hover': {
      textDecoration: 'underline',
    },
  }
});

export default BottomRight;
