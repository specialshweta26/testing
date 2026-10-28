"use client";

import { useMemo, useState } from "react";

type Product = { id: number; name: string; category: string; price: number; unit: string; emoji: string; color: string; badge?: string };
type Cart = Record<number, number>;

const products: Product[] = [
  { id: 1, name: "Avocados", category: "Produce", price: 149, unit: "2 pcs", emoji: "🥑", color: "#e8f1da", badge: "Fresh pick" },
  { id: 2, name: "Strawberries", category: "Produce", price: 129, unit: "250 g", emoji: "🍓", color: "#fde8e3" },
  { id: 3, name: "Bananas", category: "Produce", price: 48, unit: "6 pcs", emoji: "🍌", color: "#fff2c9", badge: "Best seller" },
  { id: 4, name: "Baby Spinach", category: "Produce", price: 65, unit: "150 g", emoji: "🥬", color: "#e2f0da" },
  { id: 5, name: "Sourdough Bread", category: "Bakery", price: 120, unit: "1 loaf", emoji: "🍞", color: "#f6e8d2", badge: "Baked today" },
  { id: 6, name: "Farm Fresh Eggs", category: "Dairy & Eggs", price: 96, unit: "6 pcs", emoji: "🥚", color: "#f7efdc" },
  { id: 7, name: "Whole Milk", category: "Dairy & Eggs", price: 68, unit: "500 ml", emoji: "🥛", color: "#e4eff7" },
  { id: 8, name: "Greek Yogurt", category: "Dairy & Eggs", price: 110, unit: "400 g", emoji: "🥣", color: "#f5e9dc" },
  { id: 9, name: "Almond Butter", category: "Pantry", price: 249, unit: "200 g", emoji: "🥜", color: "#efe1cf" },
  { id: 10, name: "Cherry Tomatoes", category: "Produce", price: 79, unit: "250 g", emoji: "🍅", color: "#f8e2db" },
  { id: 11, name: "Orange Juice", category: "Drinks", price: 135, unit: "1 L", emoji: "🍊", color: "#ffebd0" },
  { id: 12, name: "Dark Chocolate", category: "Snacks", price: 99, unit: "100 g", emoji: "🍫", color: "#eee1dc" },
];
const categories = ["All", "Produce", "Bakery", "Dairy & Eggs", "Pantry", "Drinks", "Snacks"];
const deliveryFee = 35;
const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;

export default function Home() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Cart>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(false);
  const filtered = useMemo(() => products.filter((product) => (category === "All" || product.category === category) && `${product.name} ${product.category}`.toLowerCase().includes(search.toLowerCase())), [category, search]);
  const cartItems = products.filter((product) => cart[product.id]);
  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const subtotal = cartItems.reduce((sum, product) => sum + product.price * cart[product.id], 0);
  const total = subtotal + (subtotal ? deliveryFee : 0);
  const setQuantity = (id: number, quantity: number) => setCart((current) => {
    const updated = { ...current };
    if (quantity <= 0) delete updated[id]; else updated[id] = quantity;
    return updated;
  });
  const addToCart = (id: number) => { setQuantity(id, (cart[id] || 0) + 1); setCheckoutDone(false); };

  return (
    <main className="store">
      <div className="announcement"><span>✦</span> Fresh finds, delivered to your door <span className="announcement-right">Free delivery on orders over ₹499</span></div>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="goodday home"><span className="brand-mark">g</span><span>goodday<span className="brand-dot">.</span></span></a>
        <div className="delivery"><span className="pin">⌖</span><span><small>Delivering to</small><strong>Indiranagar, Bengaluru <span>⌄</span></strong></span></div>
        <label className="searchbox"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find your fresh favourites..." aria-label="Search products" /><kbd>⌘ K</kbd></label>
        <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${count} items`}><span>▱</span><span className="cart-label">Your basket</span><b>{count}</b></button>
      </header>
      <section className="hero" id="top">
        <div className="hero-copy"><span className="eyebrow"><span className="sparkle">✳</span> GOOD FOOD, GOOD MOOD</span><h1>A little fresher.<br /><em>A lot happier.</em></h1><p>Everyday goodness, picked with care and brought right to your doorstep.</p><a href="#shop" className="hero-cta">Shop the good stuff <span>↘</span></a><div className="hero-proof"><div className="faces"><span>👩🏽</span><span>👨🏻</span><span>👩🏼</span></div><span>Loved by <strong>12,000+</strong> happy homes</span><span className="stars">★★★★★</span></div></div>
        <div className="hero-art" aria-label="Fresh groceries"><div className="sun"></div><div className="hero-note">picked fresh<br /><strong>just for you</strong> ♡</div><div className="hero-emoji">🥑<span>🍋</span><i>🍊</i></div><div className="floating-leaf">✿</div></div>
      </section>
      <section className="perks" aria-label="Our promises"><div><span>🌱</span><b>Always fresh</b><small>Goodness from the farm</small></div><div><span>🚲</span><b>At your door in 30 min</b><small>Quick, careful delivery</small></div><div><span>♡</span><b>Kind to your pocket</b><small>Good quality, fair prices</small></div></section>
      <section className="shop" id="shop">
        <div className="section-heading"><div><span className="eyebrow">THE GOOD STUFF</span><h2>Good things, <em>growing.</em></h2><p>A little something for every kind of day.</p></div><a href="#products">Explore all <span>→</span></a></div>
        <div className="category-row" role="tablist" aria-label="Product categories">{categories.map((item) => <button key={item} className={`category ${category === item ? "active" : ""}`} onClick={() => setCategory(item)} role="tab" aria-selected={category === item}>{item}</button>)}</div>
        {filtered.length ? <div className="product-grid" id="products">{filtered.map((product) => <article className="product-card" key={product.id}><div className="product-art" style={{ backgroundColor: product.color }}><span className="product-emoji">{product.emoji}</span>{product.badge && <span className="badge">{product.badge}</span>}<button className="quick-add" onClick={() => addToCart(product.id)} aria-label={`Add ${product.name} to basket`}>+</button>{cart[product.id] > 0 && <span className="in-cart">{cart[product.id]} in basket</span>}</div><div className="product-info"><span className="product-category">{product.category}</span><h3>{product.name}</h3><div className="product-bottom"><span><strong>{money(product.price)}</strong><small> / {product.unit}</small></span><button className="add-button" onClick={() => addToCart(product.id)}>{cart[product.id] ? "Add more +" : "Add +"}</button></div></div></article>)}</div> : <div className="no-results"><span>🧺</span><h3>No good things found just yet</h3><p>Try another search or category.</p><button onClick={() => { setSearch(""); setCategory("All"); }}>Show me everything</button></div>}
      </section>
      <footer><a className="brand" href="#top"><span className="brand-mark">g</span><span>goodday<span className="brand-dot">.</span></span></a><span>Made with a little extra care. ♡</span><span>© 2025 goodday groceries</span></footer>

      {cartOpen && <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}><aside className="cart-drawer" aria-label="Your basket"><div className="drawer-header"><div><span className="eyebrow">YOUR GOODIES</span><h2>Your basket <span>({count})</span></h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close basket">×</button></div>{checkoutDone ? <div className="checkout-success"><span>🎉</span><h3>You made a good choice!</h3><p>Your pretend order is all set. Thanks for shopping with goodday.</p><button onClick={() => { setCheckoutDone(false); setCartOpen(false); }}>Keep browsing</button></div> : cartItems.length === 0 ? <div className="empty-cart"><span>🧺</span><h3>Your basket is taking a little nap</h3><p>Add a few fresh favourites and they’ll show up here.</p><button onClick={() => setCartOpen(false)}>Find something good</button></div> : <><div className="cart-list">{cartItems.map((product) => <div className="cart-item" key={product.id}><div className="cart-thumb" style={{ backgroundColor: product.color }}>{product.emoji}</div><div className="cart-item-copy"><strong>{product.name}</strong><small>{money(product.price)} / {product.unit}</small><div className="quantity"><button onClick={() => setQuantity(product.id, cart[product.id] - 1)} aria-label={`Remove one ${product.name}`}>−</button><span>{cart[product.id]}</span><button onClick={() => setQuantity(product.id, cart[product.id] + 1)} aria-label={`Add one ${product.name}`}>+</button><button className="remove-item" onClick={() => setQuantity(product.id, 0)}>Remove</button></div></div><strong className="line-total">{money(product.price * cart[product.id])}</strong></div>)}</div><div className="order-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Delivery</span><strong>{subtotal >= 499 ? <><s>{money(deliveryFee)}</s> Free</> : money(deliveryFee)}</strong></div>{subtotal > 0 && subtotal < 499 && <p>Add {money(499 - subtotal)} more for free delivery</p>}<div className="total-row"><span>Total</span><strong>{money(subtotal + (subtotal >= 499 ? 0 : deliveryFee))}</strong></div><button className="checkout-button" onClick={() => { setCheckoutDone(true); setCart({}); }}>Checkout <span>→</span></button><small className="mock-note">Mock checkout · no payment will be taken</small></div></>}</aside></div>}
    </main>
  );
}
