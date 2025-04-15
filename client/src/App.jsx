import { useState } from "react";
import "./App.css";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      age
      name
      isMarried
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      age
      name
      isMarried
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
    }
  }
`;

const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($name: String!, $age: Int!, $isMarried: Boolean!) {
    createCustomer(name: $name, age: $age, isMarried: $isMarried) {
      name
    }
  }
`;

const GET_CUSTOMERS = gql`
  query GetCustomers {
    getCustomers {
      id
      age
      name
      isMarried
    }
  }
`;

const GET_GET_CUSTOMER_BY_ID = gql`
  query GetCustomerById($id: ID!) {
    getCustomerById(id: $id) {
      id
      age
      name
      isMarried
    }
  }
`;

function App() {
  const [newUser, setNewUser] = useState({});
  const [newCustomer, setNewCustomer] = useState({});

  const {
    data: getUsersData,
    error: getUsersError,
    loading: getUsersLoading,
  } = useQuery(GET_USERS);
  const { data: getUserByIdData, loading: getUserByIdLoading } = useQuery(
    GET_USER_BY_ID,
    {
      variables: { id: "2" },
    }
  );

  const {
    data: getCustomersData,
    error: getCustomersError,
    loading: getCustomersLoading,
  } = useQuery(GET_CUSTOMERS);
  const { data: getCustomerByIdData, loading: getCustomerByIdLoading } =
    useQuery(GET_GET_CUSTOMER_BY_ID, {
      variables: { id: "2" },
    });

  const [createUser] = useMutation(CREATE_USER);
  const [createCustomer] = useMutation(CREATE_CUSTOMER);

  if (getUsersLoading) return <p> Data loading...</p>;

  if (getUsersError) return <p> Error: {error.message}</p>;

  const handleCreateUser = async () => {
    console.log(newUser);
    createUser({
      variables: {
        name: newUser.name,
        age: Number(newUser.age),
        isMarried: false,
      },
    });
  };

  if (getCustomersLoading) return <p> Data loading...</p>;

  if (getCustomersError) return <p> Error: {error.message}</p>;

  const handleCreateCustomer = async () => {
    console.log(newCustomer);
    createCustomer({
      variables: {
        name: newCustomer.name,
        age: Number(newCustomer.age),
        isMarried: false,
      },
    });
  };

  return (
    <>
      <div>
        <input
          placeholder="Name..."
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          placeholder="Age..."
          type="number"
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, age: e.target.value }))
          }
        />
        <button onClick={handleCreateUser}> Create User</button>
      </div>

      <div>
        {getUserByIdLoading ? (
          <p> Loading user...</p>
        ) : (
          <>
            <h1> Chosen User: </h1>
            <p>{getUserByIdData.getUserById.name}</p>
            <p>{getUserByIdData.getUserById.age}</p>
          </>
        )}
      </div>

      <h1> Users</h1>
      <div>
        {" "}
        {getUsersData.getUsers.map((user) => (
          <div>
            <p> Name: {user.name}</p>
            <p> Age: {user.age}</p>
            <p> Is this user married: {user.isMarried ? "Yes" : "No"}</p>
          </div>
        ))}{" "}
      </div>

      <div>
        <div>
          <input
            placeholder="Name..."
            onChange={(e) =>
              setNewCustomer((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <input
            placeholder="Age..."
            type="number"
            onChange={(e) =>
              setNewCustomer((prev) => ({ ...prev, age: e.target.value }))
            }
          />
          <button onClick={handleCreateCustomer}> Create Customer</button>
        </div>

        <div>
          {getUserByIdLoading ? (
            <p> Loading Customer...</p>
          ) : (
            <>
              <h1> Chosen Customer : </h1>
              <p>{getUserByIdData.getUserById.name}</p>
              <p>{getUserByIdData.getUserById.age}</p>
            </>
          )}
        </div>
        <h1> Customers</h1>
        <div>
          {" "}
          {getCustomersData?.getCustomers.map((user) => (
            <div>
              <p> Name: {user.name}</p>
              <p> Age: {user.age}</p>
              <p> Is this user married: {user.isMarried ? "Yes" : "No"}</p>
            </div>
          ))}{" "}
        </div>
      </div>
    </>
  );
}

export default App;
