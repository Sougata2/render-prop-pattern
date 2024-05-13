import { faker } from "@faker-js/faker";
import { useState } from "react";

const products = Array.from({ length: 20 }, function () {
  return {
    productName: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
  };
});

const companies = Array.from({ length: 20 }, function () {
  return {
    companyName: faker.company.name(),
    phrase: faker.company.catchPhrase(),
  };
});

function ProductItem({ item }) {
  return (
    <>
      <li className="product">
        <p className="product-name">{item.productName}</p>
        <p className="product-price">{item.price}</p>
        <p className="product-description">{item.description}</p>
      </li>
    </>
  );
}

function CompanyItem({ item, defaultVisibility }) {
  return (
    <>
      <li className="company">
        <p className="company-name">{item.companyName}</p>
        {defaultVisibility && <p className="company-phrase">{item.phrase}</p>}
      </li>
    </>
  );
}

function List({ title, items, render }) {
  const [isClosed, setIsClosed] = useState(false);
  const [showLess, setShowLess] = useState(false);
  const displayItems = showLess ? items.slice(0, 3) : items;
  return (
    <>
      <button onClick={(e) => setIsClosed((isClosed) => !isClosed)}>
        {isClosed ? "Open" : "Close"}
      </button>
      <div>{title}</div>
      <ul>{!isClosed && displayItems.map(render)}</ul>

      {!isClosed && (
        <button onClick={(e) => setShowLess((showLess) => !showLess)}>
          {showLess ? "show More" : "show Less"}
        </button>
      )}
    </>
  );
}

function App() {
  return (
    <main>
      <List
        title={"PRODUCTS"}
        items={products}
        render={(item, i) => <ProductItem key={i} item={item} />}
      />
      <br />
      <List
        title={"company"}
        items={companies}
        render={(item, i) => (
          <CompanyItem key={i} item={item} defaultVisibility={false} />
        )}
      />
    </main>
  );
}

export default App;
