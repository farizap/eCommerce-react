import { actions } from "../store";
import { connect } from "unistore/react";
import React from "react";
import { Link } from "react-router-dom";

class Category extends React.Component {
  componentDidMount = () => {
    if (this.props.listCategory.length === 0) {
      this.props.getCategory2();
    }
  };

  handleCheckChange = event => {
    let checkbox = document.getElementById("sortByDescendingCheck");
    // console.log(checkbox.checked);
    if (checkbox.checked === true) {
      this.props.setSortSearch("desc");
    } else {
      this.props.setSortSearch("asc");
    }
  };

  handleSortByChange = event => {
    // console.log(event.target.value);
    this.props.setOrderBySearch(event.target.value);
  };

  render() {
    return (
      <div>
        <div className="accordion" id="accordionExample">
          <div className="card">
            <div className="card-header" id="headingOne">
              <h2 className="mb-0">
                <button
                  className="btn btn-link"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <h3>Category</h3>
                </button>
              </h2>
            </div>
            <div
              id="collapseOne"
              className="collapse show"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <div className="card-body">
                {this.props.listCategory.map(value => {
                  return (
                    <div className="col-12 border-bottom py-2">
                      <Link to={"/category/ " + value.id}>
                        <h6>{value.name}</h6>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="form px-3 pt-2">
          <div className="form-group">
            <label for="sortBySelect">Urutkan Berdasarkan</label>
            <select
              className="form-control"
              id="sortBySelect"
              onChange={this.handleSortByChange}
            >
              <option value="name">Nama</option>
              <option value="price">Harga</option>
              <option value="created_at">Terbaru</option>
              <option value="buy_count">Penjualan</option>
            </select>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="sortByDescendingCheck"
              onChange={this.handleCheckChange}
            />
            <label className="form-check-label" for="ascendingCheck">
              Descending
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "listCategory,orderBySearch, sortSearch ",
  actions
)(Category);
