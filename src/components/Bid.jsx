import React, { useEffect } from "react";
import { Button, Card, Icon } from "semantic-ui-react";
import css from "@/styles/bid/Bid.module.scss";
import { useTimer } from "react-timer-hook";
import dummyImage from "@/assets/img/dummy-product.png";
import { useRouter } from "next/router";

const Bid = ({ item }) => {
  const { seconds, minutes, hours, days, start } = useTimer({
    expiryTimestamp: new Date(item?.expiry),
    onExpire: () => {},
  });

  const router = useRouter();

  const redirect=()=>{
      router.push(`/product/${item?._id}`);
  }

  useEffect(() => {
    start();
  }, []);

  return (
    <div className={css["bid"]}>
      <Card>
        <div className={css["img-container"]}>
          <div className={css.badge}>
            <em>
              {days} <em className={css.day}>{days === 1 ? "day" : "days"}</em>
            </em>
            &nbsp;
            <em>{hours} </em>:<em>{minutes} </em>:<em>{seconds}</em>
          </div>
          <img
            src={item?.image?.trim() !== "" ? item?.image : dummyImage?.src}
            alt=""
            onClick={redirect}
          />
        </div>
        <Card.Content className={css["card-content"]}>
          <Card.Meta className={css["start-bid"]}>
            <span className="date">
              Start bid: <em>${item?.startingBid}</em>
            </span>
          </Card.Meta>
          <Card.Header className={css["price"]}>
            <em>
              <sup>$</sup> {item?.currentBid}
            </em>
          </Card.Header>
          <Card.Description onClick={redirect}>{item?.name}</Card.Description>
        </Card.Content>
        <Card.Content extra className={css.actions}>
          <Button
            icon
            labelPosition="right"
            className={css.submit}
            onClick={redirect}
          >
            Submit bid
            <Icon name="right arrow" />
          </Button>
        </Card.Content>
      </Card>
    </div>
  );
};

export const FinishedBid = ({ item }) => {
  return (
    <div className={css["finished-bid"]}>
      <Card>
        <div className={css["img-container"]}>
          <div className={css.badge}>
            <em>Final price</em>
            <em>
              <sup>$</sup> <em>{item?.price}</em>
            </em>
          </div>
          <img
            src={item?.image?.trim() !== "" ? item?.image : dummyImage?.src}
            alt=""
          />
        </div>
        <Card.Content>
          <Card.Header>{item?.name}</Card.Header>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Bid;
