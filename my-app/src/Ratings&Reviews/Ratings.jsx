/* eslint-disable */
/* eslint-disable no-plusplus */
import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import RatingBreakdown from './RatingBreakdown.jsx';
import RatingFactors from './RatingFactors.jsx';

const Ratings = ({ ratings }) => {
  console.log({ratings})
  if (ratings !== undefined) {
    //console.log({ratings})
    return (
      <div>
        <ShowRatings ratings={ratings} />
      </div>
    );
  }
  return <Loading />;
};

function Loading() {
  return <h3>loading...</h3>;
}

function ShowRatings({ ratings }) {
  console.log({ratings})
  // let trueRec = parseInt(ratings.recommended.true) || 0;
  // let falseRec = parseInt(ratings.recommended.false)  || 0;
  let num = ratings.c;
  let sum = ratings.r;
  let rec = ratings.m;

  //const ratingsObj = ratings.ratings;
  //const ratingsChars = ratings.characteristics;
  // for (let key in ratingsObj) {
  //   sum += (key * ratingsObj[key]);
  //   num += parseInt(ratingsObj[key]);
  // }
  const recommend = Math.round((rec / (num)) * 100);
  return (
    <div>
      <span className="ratingVal">{(sum / num).toFixed(1)} </span>
      <StarRatingComponent name="star" starCount={5} value={sum / num} />
      <div>{recommend}% of reviews recommend this product</div>
      {/* <RatingBreakdown ratings={ratingsObj} />
      <RatingFactors chars={ratingsChars} /> */}
    </div>
  );
}

export default Ratings;
