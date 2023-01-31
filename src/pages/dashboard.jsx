import Header from "@/components/Header";
import PreHeader from "@/components/PreHeader";
import React, { useEffect, useState } from "react";
import css from "@/styles/dashboard/Dashboard.module.scss";
import { HeadComponent } from ".";
import Glassmorphism from "@/components/Glassmorphism";
import { Button, Divider, Form, Icon, Input, Table } from "semantic-ui-react";
import { useRouter } from "next/router";
import { Products as allProducts } from "@/pages/shop";
import Footer from "@/components/Footer";
import useAjaxHook from "use-ajax-request";
import axios from "axios";
import CustomLoader from "@/components/Loader";
import dummyUser from "@/assets/img/dummy.png";
import dummyImage from "@/assets/img/dummy-product.png";
import ErrorMessage from "@/components/Error";
import ResponseError from "@/components/ResponseError";

class Menu {
  constructor(name, tab, icon) {
    this.name = name;
    this.tab = tab;
    this.icon = icon;
  }
}

const menus = [
  new Menu("User", "user", "fas fa-user"),
  new Menu("Products", "product", "fas fa-bag-shopping"),
  new Menu("Bids", "bid", "fas fa-gavel"),
  new Menu("Edit profile", "edit", "fas fa-pencil"),
  new Menu("Post bid", "new-bid", "fas fa-tags"),
];

class Tab {
  constructor(slug, component, name) {
    (this.slug = slug), (this.component = component), (this.name = name);
  }
}

const Card = ({ children, className }) => {
  return (
    <Glassmorphism className={`${css.card} ${className}`}>
      <div className={css["vector-1"]}></div>
      <div className={css["vector-2"]}></div>
      {children}
    </Glassmorphism>
  );
};

class CardClass {
  constructor(title, icon, value) {
    (this.title = title), (this.icon = icon), (this.value = value);
  }
}

const User = () => {
  const {
    sendRequest: getUser,
    data: user,
    loading: loadingUser,
    error: userError,
  } = useAjaxHook({
    instance: axios,
    options: {
      url: `${process.env.API_DOMAIN}/api/user`,
      method: "GET",
    },
  });

  const {
    sendRequest: getUserBids,
    data: userBids,
    loading: loadingUserBids,
    error: userBidsError,
  } = useAjaxHook({
    instance: axios,
    options: {
      url: `${process.env.API_DOMAIN}/api/user/bids`,
      method: "GET",
    },
  });

  const {
    sendRequest: getUserBiddings,
    data: userBiddings,
    loading: loadingUserBiddings,
    error: userBiddingsError,
  } = useAjaxHook({
    instance: axios,
    options: {
      url: `${process.env.API_DOMAIN}/api/user/biddings`,
      method: "GET",
    },
  });

  const {
    sendRequest: getUserWonBids,
    data: userWonBids,
    loading: loadingUserWonBids,
    error: userWonBidsError,
  } = useAjaxHook({
    instance: axios,
    options: {
      url: `${process.env.API_DOMAIN}/api/user/bids/won`,
      method: "GET",
    },
  });

  const cards = [
    new CardClass(
      "Total bids created",
      "fas fa-tags",
      userBids ? userBids?.length : 0
    ),
    new CardClass(
      "Total items bidded",
      "fas fa-gavel",
      userBiddings ? userBiddings?.length : 0
    ),
    new CardClass(
      "Total bids won",
      "fa-solid fa-champagne-glasses",
      userWonBids ? userWonBids?.length : 0
    ),
  ];

  useEffect(() => {
    getUser();
    getUserBids();
    getUserBiddings();
  }, []);

  if (loadingUser) {
    return <CustomLoader />;
  }

  return (
    <div className={css.user}>
      <div>
        <h1>User</h1>
        <Divider />
        <div className={css.profile}>
          <div className={css.background}></div>
          <div className={css["profile-body"]}>
            <div className={css.details}>
              <div className={css["img-container"]}>
                <img
                  src={user?.image ? user?.image : dummyUser?.src}
                  alt="profile"
                />
              </div>
              <em className={css.name}>{user?.name}</em>
              {/* <em className={css.date}>Joined on {new Date().toUTCString()}</em> */}
              <ul className={css.others}>
                <li>
                  <Icon name="phone" /> {user?.phoneNumber}
                </li>
                <li>
                  <Icon name="mail" /> {user?.email}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={css.statistics}>
        <div className={css["cards-container"]}>
          {cards.map((eachCard, i) => (
            <Card className={css[`card${i}`]} key={i}>
              <div className={css.heading}>
                <p>{eachCard.title}</p>
                <i className={eachCard.icon} />
              </div>
              <div className={css.value}>{eachCard.value}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const {
    sendRequest: getUserCreatedBids,
    data: userCreatedBids,
    loading: loadingUserCreatedBids,
    error: userCreatedBidsError,
  } = useAjaxHook({
    instance: axios,
    options: {
      url: `${process.env.API_DOMAIN}/api/user/bids`,
      method: "GET",
    },
  });

  const searchHandler = (value) => {
    const foundBids = userCreatedBids?.filter((eachBid) =>
      eachBid?.name?.toLowerCase()?.includes(value?.toLowerCase())
    );
    if (!Array.isArray(foundBids)) return;
    setProducts(foundBids);
  };

  useEffect(() => {
    getUserCreatedBids(({ data }) => {
      setProducts(data);
    });
  }, []);

  return (
    <div className={css.products}>
      <h1>Created bids</h1>
      <Divider />
      <div className={css["search-container"]}>
        <Input
          label="Search "
          placeholder="Search bids..."
          onChange={(e) => {
            searchHandler(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            router.push("/dashboard/?tab=new-bid", undefined, {
              shallow: true,
            });
          }}
        >
          Create new bid
        </Button>
      </div>
      <br />
      <div className={css.data}>
        {loadingUserCreatedBids ? (
          <CustomLoader />
        ) : (
          <>
            {products?.length < 1 ? (
              <ResponseError>No bids available</ResponseError>
            ) : (
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      <em>Image</em>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <em>Name</em>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <em>Date created</em>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <em>Starting bid</em>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <em>Current bid</em>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <em>Total bids</em>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <em>Expiry date</em>
                    </Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {products?.map((eachProduct, i) => (
                    <Table.Row key={i}>
                      <Table.Cell>
                        <img
                          src={
                            eachProduct.image
                              ? eachProduct.image
                              : dummyImage.src
                          }
                          alt=""
                        />
                      </Table.Cell>
                      <Table.Cell>{eachProduct.name}</Table.Cell>
                      <Table.Cell>{new Date().toUTCString()}</Table.Cell>
                      <Table.Cell>
                        <sup>$</sup>
                        {eachProduct.startingBid}
                      </Table.Cell>
                      <Table.Cell>
                        <sup>$</sup>
                        {eachProduct.currentBid}
                      </Table.Cell>
                      <Table.Cell>{eachProduct?.bids?.length}</Table.Cell>
                      <Table.Cell>
                        {new Date(eachProduct.expiry).toUTCString()}
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          className={css.edit}
                          onClick={() => {
                            router.push("/dashboard/?tab=edit-bid", undefined, {
                              shallow: true,
                            });
                          }}
                        >
                          Edit
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        <Button className={css.delete}>Delete</Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const EachBid = ({ eachProduct, yourBid, callGetBiddings }) => {
  const router = useRouter();

  const {
    sendRequest: withdrawUserBid,
    loading: withdrawingBid,
    error: errorWithdrawingBid,
  } = useAjaxHook({
    instance: axios,
    options: {
      url: `${process.env.API_DOMAIN}/api/bids/${eachProduct?._id}/withdraw`,
      method: "DELETE",
    },
  });

  return (
    <>
      <Table.Row key={eachProduct?._id}>
        <Table.Cell>
          <img
            src={eachProduct?.image ? eachProduct?.image : dummyImage?.src}
            alt=""
          />
        </Table.Cell>
        <Table.Cell>{eachProduct?.name}</Table.Cell>
        <Table.Cell>
          <sup>$</sup>
          {eachProduct?.startingBid}
        </Table.Cell>
        <Table.Cell>
          <sup>$</sup>
          {yourBid}
        </Table.Cell>
        <Table.Cell>
          <sup>$</sup>
          {eachProduct?.currentBid}
        </Table.Cell>
        <Table.Cell>{new Date(eachProduct?.expiry).toUTCString()}</Table.Cell>
        <Table.Cell>
          <Button
            className={css.edit}
            onClick={() => {
              router.push(`/product/${eachProduct?._id}`);
            }}
          >
            Edit bid
          </Button>
        </Table.Cell>
        <Table.Cell>
          <Button
            className={css.delete}
            onClick={() => {
              withdrawUserBid((res) => callGetBiddings());
            }}
          >
            {withdrawingBid ? "Loading..." : "Withdraw bid"}
          </Button>
        </Table.Cell>
      </Table.Row>
    </>
  );
};

const Bids = () => {
  const [bids, setBids] = useState([]);
  const {
    sendRequest: getUserBiddings,
    data: userBiddings,
    loading: loadingUserBiddings,
    error: userBiddingsError,
  } = useAjaxHook({
    instance: axios,
    options: {
      url: `${process.env.API_DOMAIN}/api/user/biddings`,
      method: "GET",
    },
  });

  const searchHandler = (value) => {
    const foundBids = userBiddings?.filter((eachBid) =>
      eachBid?.bid?.name?.toLowerCase()?.includes(value?.toLowerCase())
    );
    if (!Array.isArray(foundBids)) return;
    setBids(foundBids);
  };

  const callGetUserBiddings = () => {
    getUserBiddings(({ data }) => {
      setBids(data);
    });
  };

  useEffect(() => {
    callGetUserBiddings();
  }, []);

  return (
    <div className={css.bids}>
      <h1>Bids</h1>
      <Divider />
      <div className={css["search-container"]}>
        <Input
          label="Search "
          placeholder="Search bids..."
          onChange={(e) => {
            searchHandler(e.target.value);
          }}
        />
      </div>
      <br />
      <div className={css.data}>
        {loadingUserBiddings ? (
          <CustomLoader />
        ) : (
          <>
            {bids?.length < 1 ? (
              <ResponseError>No bids available</ResponseError>
            ) : (
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      <em>Image</em>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <em>Name</em>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <em>Amount bid</em>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <em>Your bid</em>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <em>Highest bid</em>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <em>Expiry date</em>
                    </Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {bids.map(({ bid: eachProduct, amount: yourBid }, i) => (
                    <EachBid
                      eachProduct={eachProduct}
                      yourBid={yourBid}
                      callGetBiddings={callGetUserBiddings}
                    />
                  ))}
                </Table.Body>
              </Table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const CreateBid = () => {
  return (
    <div className={css["create-bid"]}>
      <h1>Create Bid</h1>
      <Divider />
      <Form>
        <Form.Input
          label="Name"
          placeholder="Enter product name..."
          className={css["form-input"]}
        />
        <Form.TextArea
          label="Description"
          placeholder="Enter bid description..."
          type="textarea"
          className={css["form-input"]}
        />
        <Form.Input
          label="Starting bid"
          placeholder="Enter starting bid..."
          type="number"
          className={css["form-input"]}
        />
        <Form.Input
          label="Expiry date"
          placeholder="Enter date at which bid will be closed..."
          type="date"
          className={css["form-input"]}
        />
        <Form.Input
          label="Image"
          placeholder="Enter bid image..."
          type="file"
          className={css["form-input"]}
        />
        <Button className={css.submit}>Post</Button>
      </Form>
    </div>
  );
};

const EditBid = () => {
  return (
    <div className={css["create-bid"]}>
      <h1>Edit Bid</h1>
      <Divider />
      <Form>
        <Form.Input
          label="Name"
          placeholder="Enter product name..."
          className={css["form-input"]}
        />
        <Form.TextArea
          label="Description"
          placeholder="Enter bid description..."
          type="textarea"
          className={css["form-input"]}
        />
        <Form.Input
          label="Starting bid"
          placeholder="Enter starting bid..."
          type="number"
          className={css["form-input"]}
        />
        <Form.Input
          label="Expiry date"
          placeholder="Enter date at which bid will be closed..."
          type="date"
          className={css["form-input"]}
        />
        <Form.Input
          label="Image"
          placeholder="Enter bid image..."
          type="file"
          className={css["form-input"]}
        />
        <Button className={css.submit}>Update</Button>
      </Form>
    </div>
  );
};

const EditProfile = () => {
  return (
    <div className={css["edit-profile"]}>
      <h1>Edit profile</h1>
      <Divider />
      <Form>
        <Form.Input
          label="Name"
          placeholder="Enter full name..."
          className={css["form-input"]}
        />
        <Form.Input
          label="Email address"
          placeholder="Enter email address..."
          type="email"
          className={css["form-input"]}
        />
        <Form.Input
          label="Phone number"
          placeholder="Enter phone number..."
          type="number"
          className={css["form-input"]}
        />
        <Form.Input
          label="Image"
          placeholder="Enter profile picture..."
          type="file"
          className={css["form-input"]}
        />
        <Button className={css.submit}>Update</Button>
      </Form>
    </div>
  );
};

const Tabs = [
  new Tab("user", <User />, "User"),
  new Tab("product", <Products />, "Products"),
  new Tab("bid", <Bids />, "Bids"),
  new Tab("edit", <EditProfile />, "Edit profile"),
  new Tab("new-bid", <CreateBid />, "New bid"),
  new Tab("edit-bid", <EditBid />, "Edit bid"),
];

const MenuComponent = () => {
  const router = useRouter();

  return (
    <Glassmorphism className={css.menu}>
      <div className={css.heading}>
        <h3>Dashboard</h3>
        <Divider />
      </div>
      <ul className={css.list}>
        {menus.map((menu, i) => (
          <li
            key={i}
            onClick={() => {
              router.push(`/dashboard/?tab=${menu.tab}`, undefined, {
                shallow: true,
              });
            }}
          >
            <i className={menu.icon} />
            <em>{menu.name}</em>
          </li>
        ))}
      </ul>
    </Glassmorphism>
  );
};

const Dashboard = () => {
  const router = useRouter();
  const slug = router.query?.tab;

  const getComponent = (slug) => {
    if (!slug || slug?.trim() === "") {
      return Tabs[0].component;
    }

    const tabObjectArray = Tabs.filter((eachTab) => eachTab.slug === slug);
    return tabObjectArray[0].component;
  };

  return (
    <>
      <HeadComponent></HeadComponent>
      <div className={css.dashboard}>
        <div className={css["pre-header"]}>
          <PreHeader />
        </div>
        <Header />
        <div className={css.body}>
          <div className={css.menu}>
            <MenuComponent />
          </div>
          <div className={css.tab}>
            <Glassmorphism>{getComponent(slug)}</Glassmorphism>
          </div>
        </div>
        <br />
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
