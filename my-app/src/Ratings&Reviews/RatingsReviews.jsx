/* eslint-disable */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import Ratings from './Ratings.jsx';
import MoreReviewsButton from './MoreReviewsButton.jsx';
import AddReview from './AddReview.jsx';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      reviewIndex: 2,
      isOpen: false,
      ratings: {},
    };
    this.getReviews = this.getReviews.bind(this);
    this.loadMoreReviews = this.loadMoreReviews.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    //this.getRatings = this.getRatings.bind(this);
  }

  componentDidMount() {
    this.setState({
      product_id: this.props.productID,
    }, () => {
      this.getReviews();
    });
  }
  // componentDidUpdate() {
  //   this.getRatings(this.state.reviews);
  // }
  // componentDidMount() {
  //   this.setState({
  //     product_id: this.props.productID,
  //   }, () => {
  //     this.getReviews();
  //   });
  // }
  // console.log({reviews})
  // console.log({ratings})

  getReviews() {
    axios.get('/reviews', {
      params: {
        product_id: this.state.product_id,
        //product_id: 1,
      },
    })
      .then(response => {
        //console.log({response})
        let results = response.data;
        //console.log({results});
        // this.setState({ratings: results.rating});
        // console.log({ratings});
        this.setState({ reviews: results });
        //console.log({reviews})
        return response;
      })
      .then(response => {
        let temp = {
          c : 0,
          r : 0,
          m : 0,
        };
        let target = response.data;
        console.log(target)
        target.forEach((item, index) => {
          temp.c++;
          temp.r = temp.r + item.rating;
          temp.m = (item.recommend) ? (temp.m = temp.m + 1)  : (temp.m=temp.m);
        });
        console.log(temp.c);
        this.setState({ratings: temp });
      })
      .catch(response => {
        console.log(response);
      })
      // .finally(() => {
      //   console.log({reviews})
      // })
  };
  // getRatings() {
  //   console.log(this.state.reviews)
  //   let temp = {
  //     c : 0,
  //     r : 0,
  //     m : 0,
  //   };
  //   target.forEach((item, index) => {
  //       temp.c++;
  //       temp.r = temp.r + item.rating;
  //       temp.m = (item.recommend) ? temp.m++ : temp.m;
  //   });
  //   console.log({temp});
  //   if(temp.c > 0) {
  //     this.setState({
  //       ratings: temp,
  //     })
  //   }
  //   console.log({ratings});
  // }


  // getReviews() {
  //   fetch('http://localhost:3000/db/reviews')
  //     .then(response => {
  //       console.log(response)
  //     })
  //     .then(data => {
  //       setMerchants(data);
  //     });
  // }


  loadMoreReviews() {
    this.setState({
      reviewIndex: this.state.reviewIndex + 2,
    })
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }
  //handleSubmit(name) => //some code

  render() {
    return (
      <div id="ratingsReviewsContainer">
        <div className="rrtitle">Ratings and Reviews</div>
        <div className="ratings">
          {(this.state.ratings.c > 1) ? (
            <Ratings ratings={this.state.ratings} />
          ) : null
            // <Ratings/>
          }
        </div>
        <div className="reviews">
          <ReviewList reviews={this.state.reviews} index={this.state.reviewIndex} />
        </div>
        <div className="buttons">
          <MoreReviewsButton more={this.loadMoreReviews} number={this.state.reviews.length} />
          <Button variant="outline-primary" type="button" className="btn btn-outline-primary mx-5"onClick={this.openModal}>ADD A REVIEW +</Button>
          { this.state.isOpen ? (
            <AddReview
              closeModal={this.closeModal}
              isOpen={this.state.isOpen}
              handleSubmit={this.handleSubmit}
            />
          )
            : null}
        </div>
      </div>
    );
  }
}

export default RatingsReviews;
