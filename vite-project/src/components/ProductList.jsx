import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { addToWishlist } from "../store/wishlistSlice";
import { Link, useLocation } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [minRating, setMinRating] = useState(0);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);

  const [visibleCount, setVisibleCount] = useState(12);

  const dispatch = useDispatch();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const urlSearch = params.get("search") || "";

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=10000")
      .then(res => res.json())
      .then(data => {
        const list = data.products || [];
        setProducts(list);
        setFiltered(list);

        const cats = [...new Set(list.map(p => p.category))];
        setCategories(cats);

        const prices = list.map(p => p.price);
        setMinPrice(Math.min(...prices));
        setMaxPrice(Math.max(...prices));
      });
  }, []);

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    let result = [...products];

    if (search) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter(p =>
        selectedCategories.includes(p.category)
      );
    }

    result = result.filter(
      p => p.price >= minPrice && p.price <= maxPrice
    );

    result = result.filter(p => (p.rating || 0) >= minRating);

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);

    setFiltered(result);
    setVisibleCount(12);
  }, [search, selectedCategories, minPrice, maxPrice, sort, minRating, products]);

  const toggleCategory = cat => {
    setSelectedCategories(prev =>
      prev.includes(cat)
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );
  };

  return (
    <div className="container mt-4 fade-in">

      {/* FILTER BAR */}
      <div className="card filter-card p-4 mb-4 shadow">
        <div className="row g-3 align-items-end">

          <div className="col-md-3">
            <label className="form-label text-white">Search</label>
            <input
              className="form-control rounded-pill"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label text-white">Sort</label>
            <select
              className="form-select rounded-pill"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="">Default</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label text-white">Rating</label>
            <select
              className="form-select rounded-pill"
              value={minRating}
              onChange={e => setMinRating(Number(e.target.value))}
            >
              <option value="0">All Ratings</option>
              <option value="2">2+ ⭐</option>
              <option value="3">3+ ⭐</option>
              <option value="4">4+ ⭐</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label text-white">
              Price: ${minPrice} – ${maxPrice}
            </label>
            <input
              type="range"
              className="form-range"
              min="0"
              max="2000"
              step="10"
              value={minPrice}
              onChange={e => setMinPrice(Number(e.target.value))}
            />
            <input
              type="range"
              className="form-range"
              min="0"
              max="2000"
              step="10"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
            />
          </div>
        </div>

        {/* CATEGORY CHIPS */}
        <div className="mt-3">
          <strong className="text-white">Categories:</strong>
          <div className="d-flex flex-wrap mt-2 gap-2">
            {categories.map(cat => (
              <span
                key={cat}
                className={`category-chip ${
                  selectedCategories.includes(cat) ? "active" : ""
                }`}
                onClick={() => toggleCategory(cat)}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="row g-4">
        {filtered.slice(0, visibleCount).map(p => (
          <div key={p.id} className="col-lg-3 col-md-4 col-sm-6">
            <div className="card h-100 product-card shadow-sm">

              {/* Rating Badge */}
              <span className="rating-badge">
                ⭐ {p.rating}
              </span>

              <img
                src={p.thumbnail}
                className="card-img-top p-3"
                style={{ height: 190, objectFit: "contain" }}
              />

              <div className="card-body d-flex flex-column">
                <h6 className="product-title">
                  {p.title.slice(0, 45)}
                </h6>

                <p className="product-price">
                  ${p.price}
                </p>

                <Link
                  to={`/product/${p.id}`}
                  className="btn btn-outline-secondary btn-sm mb-2"
                >
                  View Details
                </Link>

                <button
                  className="btn btn-outline-danger btn-sm mb-2"
                  onClick={() => dispatch(addToWishlist(p))}
                >
                  ❤️ Wishlist
                </button>

                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => dispatch(addToCart(p))}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LOAD MORE */}
      {visibleCount < filtered.length && (
        <div className="text-center mt-5">
          <button
            className="btn btn-lg btn-outline-primary rounded-pill px-4"
            onClick={() => setVisibleCount(v => v + 12)}
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
}