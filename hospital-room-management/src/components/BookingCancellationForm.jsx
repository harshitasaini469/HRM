import { useState } from "react";

const BookingCancellationForm = () => {
  const [orderId, setOrderId] = useState("");
  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="orderId">Order Id:</label>
          <input
            type="text"
            name="OrderId"
            id="OrderId"
            className="form-control"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-danger">Cancel Order</button>
      </form>
    </div>
  );
};
