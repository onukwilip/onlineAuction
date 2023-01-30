import React, { useEffect, useState } from "react";
import css from "@/styles/product/Product.module.scss";
import PreHeader from "./PreHeader";
import Header from "./Header";
import Link from "next/link";
import { Button, Divider, Feed, Form, Icon, Input } from "semantic-ui-react";
import { Products, ProductUI } from "@/pages/shop";
import Footer from "./Footer";
import Bid from "./Bid";
import useAjaxHook from "use-ajax-request";
import axios from "axios";
import { useRouter } from "next/router";
import dummyImage from "@/assets/img/dummy-product.png";
import CustomLoader from "./Loader";
import ResponseError from "./ResponseError";
import { useInput } from "use-manage-form";
import ErrorMessage from "./Error";
import LoginSignup from "./LoginSignup";
import Modal from "./Modal";

const product = {
  name: "Apple MacBook Pro 13'' 2.3GHz 128GB Space Gray",
  startingBid: 200,
  currentBid: 500,
  image:
    "https://images.unsplash.com/photo-1504707748692-419802cf939d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=847&q=80",
  images: [
    "https://images.unsplash.com/photo-1504707748692-419802cf939d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=847&q=80",
    ,
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWFjYm9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFjYm9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1526570207772-784d36084510?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1hY2Jvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  ],
  expiry: 1674810091746,
  numberOfBids: 20,
  description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus doloremque tenetur nihil porro cumque nostrum illum temporibus provident, illo distinctio?",
};
const ProductComponent = (props) => {
  const [image, setImage] = useState("");
  const router = useRouter();
  const productId = router.query.productId;
  const [postedSuccessfully, setPostedSuccessfully] = useState(false);
  const {
    value: amount,
    isValid: amountIsValid,
    reset: resetAmount,
    onChange: onAmountChange,
    onBlur: onAmountBlur,
  } = useInput((value) => value?.trim() !== "");
  const [showLogin, setShowLogin] = useState(false);

  const {
    sendRequest: getProduct,
    data: product,
    loading,
    error,
  } = useAjaxHook({
    instance: axios,
    options: {
      url: `${process.env.API_DOMAIN}/api/bids/${productId}`,
      method: "GET",
    },
  });

  const {
    sendRequest: getRecommended,
    data: recommended,
    loading: recommendedLoading,
    error: recommendedError,
  } = useAjaxHook({
    instance: axios,
    options: {
      url: `${process.env.API_DOMAIN}/api/bids/query`,
      method: "POST",
      data: [
        {
          $match: {
            ["_id"]: { $ne: product?._id },
            category: product?.category,
          },
        },
      ],
    },
  });

  const {
    sendRequest: postBid,
    error: postError,
    loading: postingBid,
  } = useAjaxHook({
    instance: axios,
    options: {
      url: `${process.env.API_DOMAIN}/api/bids/${productId}/bid`,
      method: "PUT",
      data: { amount: +amount },
    },
  });

  const callGetProduct = () => {
    getProduct(
      (res) => {
        setImage(res?.data?.image);
      },
      (err) => (err?.response?.status === 404 ? router.replace("/") : null)
    );
  };

  const onSuccess = (res) => {
    setPostedSuccessfully(true);
    resetAmount();

    callGetProduct();

    setTimeout(() => {
      setPostedSuccessfully(false);
    }, [1000 * 6]);
  };

  const onError = (err) => {
    if (err?.response?.status === 401) {
      // Show login modal
      setShowLogin(true);
    }
  };

  const submitHandler = () => {
    postBid(onSuccess, onError);
  };

  useEffect(() => {
    callGetProduct();
  }, [productId]);

  useEffect(() => {
    getRecommended();
  }, [product]);

  return (
    <>
      {showLogin && (
        <Modal show={setShowLogin}>
          <LoginSignup toogle="login" />
        </Modal>
      )}
      <div className={css.product}>
        <div className={css["pre-header"]}>
          <PreHeader />
        </div>
        <Header />
        <div className={css.body}>
          <div className={css.link}>
            <Link href="/shop">
              <Icon name="arrow left" />
              Back to shop
            </Link>
          </div>
          {loading ? (
            <CustomLoader />
          ) : (
            <>
              <div className={css["sub-body"]}>
                {error?.response?.status === 404 ? (
                  <ResponseError>Bid doesn't exist</ResponseError>
                ) : (
                  <>
                    <div className={css.photos}>
                      {product?.images?.map((image, i) => (
                        <img
                          src={image}
                          alt="Photo"
                          key={i}
                          onClick={() => {
                            setImage(image);
                          }}
                        />
                      ))}
                    </div>
                    <div className={css.image}>
                      <img
                        src={image?.trim() !== "" ? image : dummyImage?.src}
                        alt="Image"
                      />
                    </div>
                    <div className={css["desc-container"]}>
                      <h1>{product?.name}</h1>
                      <p>{product?.description}</p>
                      <Divider />
                      <p>
                        Starting bid:{" "}
                        <b>
                          <sup>$</sup>
                          {product?.startingBid}
                        </b>
                      </p>
                      <p>
                        Current bid:{" "}
                        <b className={css["current-bid"]}>
                          <sup>$</sup>
                          {product?.currentBid}
                        </b>
                      </p>
                      <Form onSubmit={submitHandler}>
                        <Input
                          className={css.bid}
                          label="Set a bid"
                          placeholder="E.g: $100"
                          min={product?.startingBid}
                          type="number"
                          value={amount}
                          onChange={(e) => {
                            onAmountChange(e?.target?.value);
                          }}
                        />
                        <div className={css.action}>
                          <Button disabled={postingBid}>
                            {postingBid ? "Loading..." : "Send bid"}
                          </Button>
                        </div>
                        {postError && postError?.response?.status !== 401 && (
                          <ErrorMessage>
                            {postError?.response?.data?.message}
                          </ErrorMessage>
                        )}
                        {postedSuccessfully && <p>Bid posted successfully</p>}
                      </Form>
                      <Divider />
                      <Feed className={css.user}>
                        <Feed.Event>
                          <Feed.Label image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" />
                          <Feed.Content>
                            <Feed.Summary>Prince C. Onukwili</Feed.Summary>
                            <Feed.Date content="Author" />
                          </Feed.Content>
                        </Feed.Event>
                      </Feed>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          <div className={css.recommended}>
            <div>
              <h1>Recommended</h1>{" "}
              <Link href="/shop">
                View more <Icon name="arrow right" />
              </Link>
            </div>
            <div className={css.products}>
              {recommendedLoading ? (
                <div style={{ width: "100%" }}>
                  <CustomLoader />
                </div>
              ) : (
                <>
                  {(recommendedError || recommended?.length < 1) && (
                    <ResponseError>No bids available</ResponseError>
                  )}
                  {recommended?.slice(0, 4)?.map((product, i) => (
                    <Bid item={product} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        <br />
        <Footer />
      </div>
    </>
  );
};
export default ProductComponent;
