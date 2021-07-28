// import React, { useContext, useEffect } from "react";
// import { observer } from "mobx-react";
// import { withRouter } from "react-router-dom";
//
// import { RootStoreContext, AuthStoreContext } from "../../stores";
// import { Navbar } from "../";
// import Users from "./Users";
// import Categories from "./Categories";
//
// const Admin = withRouter(
//   observer(() => {
//     const { loginState } = useContext(AuthStoreContext);
//     const {
//       listUsers,
//       createUser,
//
//       listCategories,
//       createCategory,
//
//       adminState,
//     } = useContext(RootStoreContext);
//
//     useEffect(() => {
//       listUsers(loginState.authToken);
//       listCategories(loginState.authToken);
//     }, [adminState]);
//
//     if (!loginState.isAdmin) {
//       // TODO - Make this prettier
//       return <h1>You are not an admin </h1>;
//     }
//
//     return (
//       <div>
//         <Navbar />
//         <Users
//           createUser={createUser}
//           loginState={loginState}
//           users={adminState.users}
//           userError={adminState.userError}
//         />
//         <div className="mt-3 mb-3" />
//         <Categories
//           createCategory={createCategory}
//           loginState={loginState}
//           categories={adminState.categories}
//           categoryError={adminState.categoryError}
//         />
//       </div>
//     );
//   })
// );
//
// export default Admin;
