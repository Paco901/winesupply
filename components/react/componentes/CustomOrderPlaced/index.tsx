import React from "react";
//@ts-ignore
import { useOrder } from 'vtex.order-placed/OrderContext';
import styles from './index.css'

const RowDetail = ({ CurrencySimbol, item }) => {
  const price = (item.price / 100).toFixed(2);
  //@ts-ignore
  const subtotal = (price * item.quantity).toFixed(2)
  console.log("ITEM: ", item)
  return (
    <div className={styles.rowDetail}>
      <img className={styles.itemImage} src={item.imageUrl.replace("55-55", "550-550")} />
      <div className={styles.infoContainer}>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.quantityContent}>
          <span className={styles.quantityLabel}>Cantidad:&nbsp;</span>
          <span className={styles.quantity}>{item.quantity} {item.measurementUnit != 'un' && item.measurementUnit}</span>
        </div>
        <div className={styles.subtotal}>
          <span>{CurrencySimbol} {subtotal}</span>
        </div>
      </div>
    </div>
  );
}

const CustomOrderPlaced = () => {
  const order = useOrder();
  console.log("Orden", order)
  const date = new Date(order.deliveryParcels[0].shippingEstimateDate);
  return (
    <div className={styles.containerOrderGrid}>
      <div className={styles.container}>
        <div className={styles.containerShipping}>
          <div>
            <strong>
              {<span style={{ color: "#424242" }}>ENVÍO {order.deliveryParcels[0].selectedSla.toUpperCase()}</span>}
            </strong>
          </div>
          {<span style={{ color: "#9E9E9E" }}>Hasta el {date.getDate()} de {date.toLocaleString('default', { month: 'long' })} de {date.getFullYear()}</span>}
        </div>
        {order?.items.map((item, index) => (
          <RowDetail key={index} item={item} CurrencySimbol={'$'} />
        ))}
      </div>
      <div>
        <div className={styles.containerInfoShipping}>
          <div className="vtex-rich-text-0-x-container vtex-rich-text-0-x-container--order-placedcard-title flex tl items-start justify-start t-body c-on-base">
            <div className="vtex-rich-text-0-x-wrapper vtex-rich-text-0-x-wrapper--order-placedcard-title">
              <p className="lh-copy vtex-rich-text-0-x-paragraph vtex-rich-text-0-x-paragraph--orderplaced-card-title">
                RECIBE
              </p>
            </div>
          </div>
          <div className="flex flex-column c-on-base">
            <div className="vtex-profile-form-3-x-profileSummary">
              <ul className="vtex-order-placed-2-x-customerInfoListContainer list pl0">
                <li className="vtex-order-placed-2-x-customerInfoListEmail pv2 c-muted-2">
                  {order.deliveryParcels[0].address.receiverName}
                </li>
                <li className="vtex-order-placed-2-x-customerInfoListEmail pv2 c-muted-2">
                  {order.deliveryParcels[0].address.city}
                </li>
                <li className="vtex-order-placed-2-x-customerInfoListDocument pv2 c-muted-2">
                  {order.deliveryParcels[0].address.state}
                </li>
                <li className="vtex-order-placed-2-x-customerInfoListPhone pv2 c-muted-2">
                  {order.deliveryParcels[0].address.addressType}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomOrderPlaced;
