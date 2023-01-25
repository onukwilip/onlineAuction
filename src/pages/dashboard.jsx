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

const cards = [
  new CardClass("Total bids created", "fas fa-tags", 0),
  new CardClass("Total items bidded", "fas fa-gavel", 4),
  new CardClass("Total bids won", "fa-solid fa-champagne-glasses", 1),
];

const User = () => {
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
                  src="https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                  alt="profile"
                />
              </div>
              <em className={css.name}>Prince C. Onukwili</em>
              <em className={css.date}>Joined on {new Date().toUTCString()}</em>
              <ul className={css.others}>
                <li>
                  <Icon name="phone" /> +234 9017589571
                </li>
                <li>
                  <Icon name="mail" /> onukwilip@gmail.com
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

  useEffect(() => {
    setProducts([...allProducts]);
  }, []);

  return (
    <div className={css.products}>
      <h1>Created bids</h1>
      <Divider />
      <div className={css["search-container"]}>
        <Input label="Search " placeholder="Search bids..." />
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
            {products.map((eachProduct, i) => (
              <Table.Row key={i}>
                <Table.Cell>
                  <img src={eachProduct.image} alt="" />
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
                <Table.Cell>{i + 5}</Table.Cell>
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
      </div>
    </div>
  );
};

const Bids = () => {
  const [bids, setBids] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setBids([...allProducts]);
  }, []);

  return (
    <div className={css.bids}>
      <h1>Bids</h1>
      <Divider />
      <div className={css["search-container"]}>
        <Input label="Search " placeholder="Search bids..." />
      </div>
      <br />
      <div className={css.data}>
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
                <em>Current bid</em>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <em>Expiry date</em>
              </Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {bids.map((eachProduct, i) => (
              <Table.Row key={i}>
                <Table.Cell>
                  <img src={eachProduct.image} alt="" />
                </Table.Cell>
                <Table.Cell>{eachProduct.name}</Table.Cell>
                <Table.Cell>
                  <sup>$</sup>
                  {eachProduct.startingBid}
                </Table.Cell>
                <Table.Cell>
                  <sup>$</sup>
                  {eachProduct.currentBid}
                </Table.Cell>
                <Table.Cell>
                  {new Date(eachProduct.expiry).toUTCString()}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    className={css.edit}
                    onClick={() => {
                      router.push(`/product/${i}`);
                    }}
                  >
                    Edit bid
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button className={css.delete}>Withdraw bid</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
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
