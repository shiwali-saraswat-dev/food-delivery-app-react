// useSelector: reads data from the Redux store | useDispatch: sends actions to the store
import { useDispatch, useSelector } from "react-redux";
// Cart actions: empty the cart, and change an item's quantity by id
import { clearCart, increaseQty, decreaseQty, removeItem } from "../utils/cartSlice";

const Cart = () => {
    // Subscribe to cart items; component re-renders whenever they change
    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();

    const handleClearCart = () => dispatch(clearCart());

    // Total quantity across all rows (items without qty count as 1)
    const totalQty = cartItems.reduce((sum, i) => sum + (i.qty ?? 1), 0);

    return (
        <div className="cart-card">
            {/* Header: title with total count, and Clear Cart (only when cart has items) */}
            <div className="cart-header">
                <h2 className="cart-title">
                    Cart
                    {cartItems.length > 0 && <span className="cart-count">{totalQty}</span>}
                </h2>
                {cartItems.length > 0 && (
                    <button className="clear-cart-btn" onClick={handleClearCart}>
                        🗑 Clear Cart
                    </button>
                )}
            </div>

            {/* Empty state vs. cart list */}
            {cartItems.length === 0 ? (
                <div className="cart-empty">Your cart is empty. Add some delicious items!</div>
            ) : (
                <>
                    {cartItems.map((item) => {
                        // Unwrap the Swiggy item shape once; skip malformed items
                        const info = item?.card?.info;
                        if (!info) return null;

                        const price = (info.price ?? info.defaultPrice ?? 0) / 100; // paise -> rupees
                        const qty = item.qty ?? 1;
                        const isVeg = info.isVeg === 1 || info.itemAttribute?.vegClassifier === "VEG";

                        return (
                            <div key={info.id} className="cart-row">
                                {/* Item name, veg/non-veg marker and category */}
                                <div className="cart-row-info">
                                    <div className="cart-row-title">
                                        <span className={`cart-veg ${isVeg ? "" : "non-veg"}`} />
                                        <span className="cart-item-name">{info.name}</span>
                                    </div>
                                    {info.category && <div className="cart-item-variant">{info.category} ▾</div>}
                                </div>

                                {/* Quantity stepper: "info" is in scope because we are inside the map callback */}
                                <div className="qty-stepper">
                                    <button
                                        type="button"
                                        className="qty-btn"
                                        aria-label={`Decrease quantity of ${info.name}`}
                                        onClick={() => dispatch(decreaseQty(info.id))} // removes the row at 0
                                    >
                                        −
                                    </button>
                                    <span className="qty-value">{qty}</span>
                                    <button
                                        type="button"
                                        className="qty-btn plus"
                                        aria-label={`Increase quantity of ${info.name}`}
                                        onClick={() => dispatch(increaseQty(info.id))}
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Right side: line total + remove icon */}
                                <div className="cart-row-end">
                                    <div className="cart-item-price">₹{price * qty}</div>
                                    <button
                                        type="button"
                                        className="remove-item-btn"
                                        title="Remove item"
                                        aria-label={`Remove ${info.name} from cart`}
                                        onClick={() => dispatch(removeItem(info.id))} // removes the whole row, whatever its qty
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 6h18" />
                                            <path d="M8 6V4h8v2" />
                                            <path d="M19 6l-1 14H6L5 6" />
                                            <path d="M10 11v6M14 11v6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    {/* Extra actions (not wired up yet) */}
                    <div className="cart-actions">
                        <span className="cart-action-btn">+ Add Items</span>
                        <span className="cart-action-btn">✎ Cooking requests</span>
                        <span className="cart-action-btn">
                            <span className="cart-checkbox" /> Cutlery Needed
                        </span>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;