// import { createContext, useContext, useEffect, useState } from "react";

// const TransactionContext = createContext(null);

// export function TransactionProvider({ children }) {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(()=>{
//     const fetchData = async () =>{
//        try{
//           const getAllTransactionResponse = await
//             fetch("http://localhost:3000/user/page/limit=${limit}&search=${search}&category=${activeTab}",
//               {method:"Get",
//                 headers:{
//                   "Content-Type":"application/json"
//                 },
//                 credentials:"include"
//               }
//             )
         
//           console.log(getAllTransactionResponse)

//           if(!getAllTransactionResponse){
//             throw new Error("Unable to fetch data.");
//           }

//           const listTransactionResult =await getAllTransactionResponse.json();

//           console.log(listTransactionResult.data);

//           setTransactions(listTransactionResult.data);


//        }catch(error){
//         console.log(error)
//        }
//     }
//      fetchData();
//   } ,[])

//   const addTransaction = (t) =>
//     setTransactions((prev) => [{ ...t, _id: Date.now() }, ...prev]);

//   const updateTransaction = (updated) =>
//     setTransactions((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));

//   const deleteTransaction = (id) =>
//     setTransactions((prev) => prev.filter((t) => t._id !== _id));

//   return (
//     <TransactionContext.Provider value={{ transactions, addTransaction, updateTransaction, deleteTransaction }}>
//       {children}
//     </TransactionContext.Provider>
//   );
// }

// export function useTransactions() {
//   const ctx = useContext(TransactionContext);
//   if (!ctx) throw new Error("useTransactions must be used inside TransactionsProvider");
//   return ctx;
// }


// import { createContext, useContext, useState } from "react";

// const TransactionContext = createContext(null);

// export function TransactionProvider({ children }) {
//   const [transactions, setTransactions] = useState([]);
//   const [pagination, setPagination] = useState({
//     totalItems: 0,
//     totalPages: 1,
//     currentPage: 1,
//     limit: 10,
//     hasNextPage: false,
//     hasPrevPage: false
//   });
//   const [loading, setLoading] = useState(false);

//   // 1. DYNAMIC FETCH FUNCTION (Called by the UI Component)
//   const fetchExpenses = async ({ page = 1, limit = 10, search = "", category = "All" }) => {
//     setLoading(true);
//     try {
//       // Build proper URL query parameters matching your backend queryObj expectations
//       const queryParams = new URLSearchParams({ page, limit });
//       if (search.trim()) queryParams.append("search", search.trim());
//       if (category !== "All") queryParams.append("category", category);

//       // Fixed: Converted string to a proper backtick template literal and used query params syntax (?)
//       const response = await fetch(`http://localhost:3000/user/getExpensePage?${queryParams.toString()}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         credentials: "include" // Keeps your cookie/session tracking intact
//       });

//       if (!response.ok) {
//         throw new Error("Unable to fetch data from server.");
//       }

//       const result = await response.json();

//       if (result.success) {
//         setTransactions(result.data);       // Store the 10 expenses for this page
//         setPagination(result.pagination); // Store pagination meta (totalPages, hasNextPage, etc.)
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchExpenses();

//   // 2. BACKEND MUTATION PLACEHOLDERS
//   // Tip: Eventually, these should make actual POST/PUT/DELETE fetch calls to your API
//   const addTransaction = (t) =>
//     setTransactions((prev) => [{ ...t, _id: Date.now().toString() }, ...prev]);

//   const updateTransaction = (updated) =>
//     setTransactions((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));

//   // Fixed: Changed standard state filtering variable from matching undefined `_id` to matching parameter `id`
//   const deleteTransaction = (id) =>
//     setTransactions((prev) => prev.filter((t) => t._id !== id));

//   return (
//     <TransactionContext.Provider 
//       value={{ 
//         transactions, 
//         pagination, 
//         loading, 
//         fetchExpenses, 
//         addTransaction, 
//         updateTransaction, 
//         deleteTransaction 
//       }}
//     >
//       {children}
//     </TransactionContext.Provider>
//   );
// }

// export function useTransactions() {
//   const ctx = useContext(TransactionContext);
//   if (!ctx) throw new Error("useTransactions must be used inside TransactionsProvider");
//   return ctx;
// }

// import { createContext, useContext, useState } from "react";

// const TransactionContext = createContext(null);

// export function TransactionProvider({ children }) {
//   // State for API 1 (Table view)
//   const [paginatedTransactions, setPaginatedTransactions] = useState([]);
//   const [pagination, setPagination] = useState({ totalPages: 1, currentPage: 1 });
  
//   // State for API 2 (Charts & Stats view)
//   const [allTransactions, setAllTransactions] = useState([]); 

//   // --- CALLS API 1: For the Paginated Table ---
//   const fetchPaginatedExpenses = async ({ page = 1, limit = 10, search = "", category = "All" }) => {
//     try {
//       const queryParams = new URLSearchParams({ page, limit, search, category });
//       const res = await fetch(`http://localhost:3000/user/getExpensePage?${queryParams.toString()}`, { credentials: "include" });
//       const result = await res.json();
//       if (result.success) {
//         setPaginatedTransactions(result.data);
//         setPagination(result.pagination);
//       }
//     } catch (e) { console.error(e); }
//   };

//   // --- CALLS API 2: For Charts, Graphs & Total Balance Accumulators ---
//   const fetchAllExpensesWithoutLimit = async () => {
//     try {
//       const res = await fetch(`http://localhost:3000/user/getUserExpenses`, { credentials: "include" });
//       const result = await res.json();
//       if (result.success) {
//         setAllTransactions(result.data); // Stores everything without truncation
//       }
//     } catch (e) { console.error(e); }
//   };

//   return (
//     <TransactionContext.Provider value={{ 
//       paginatedTransactions, 
//       pagination, 
//       allTransactions, 
//       fetchPaginatedExpenses, 
//       fetchAllExpensesWithoutLimit 
//     }}>
//       {children}
//     </TransactionContext.Provider>
//   );
// }

// export const useTransactions = () => useContext(TransactionContext);

import React, { createContext, useContext, useState } from "react";

const TransactionContext = createContext(null);

export function TransactionProvider({ children }) {
  const [paginatedTransactions, setPaginatedTransactions] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Calls pagination.controller.js (allExpenseByPage)
  const fetchPaginatedExpenses = async ({ page = 1, limit = 10, search = "", category = "All" }) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({ page, limit });
      if (search.trim()) queryParams.append("search", search.trim());
      if (category !== "All") queryParams.append("category", category);

      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/user/expenses-paginated?${queryParams.toString()}`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        credentials: "include"
      });

      const result = await response.json();
      if (result.success) {
        setPaginatedTransactions(result.data);
        setPagination(result.pagination);
      }
    } catch (error) {
      console.error("Error fetching paginated data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calls expense.controller.js (getUserExpense)
  const fetchAllExpensesWithoutLimit = async (range = "") => {
    try {
      const url = range ? `http://localhost:3000/user/expenses-all?range=${range}` : "http://localhost:3000/user/expenses-all";
      const token = localStorage.getItem('token');
      const response = await fetch(url, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        credentials: "include"
      });
      const result = await response.json();
      if (result.success) {
        setAllTransactions(result.data);
      }
    } catch (error) {
      console.error("Error fetching all data:", error);
    }
  };

  const addTransaction = async (formData) => {
    try {
      const payload = {
        ...formData,
        category: formData.category ? formData.category.toLowerCase() : "others"
      };
      const token = localStorage.getItem('token');
      const res = await fetch("http://localhost:3000/user/expense", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        credentials: "include",
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        fetchAllExpensesWithoutLimit();
        return true;
      }
    } catch (err) { console.error(err); }
    return false;
  };

  const updateTransaction = async (updatedItem) => {
    try {
      const payload = {
        title: updatedItem.title,
        category: (updatedItem.category || "others").toLowerCase(),
        amount: parseFloat(updatedItem.amount),
        dateAndTime: updatedItem.dateAndTime
      };
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3000/user/updateExpense/${updatedItem._id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        credentials: "include",
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setPaginatedTransactions((prev) => prev.map((t) => (t._id === updatedItem._id ? { ...updatedItem, ...payload } : t)));
        fetchAllExpensesWithoutLimit();
      } else {
        const err = await res.json();
        console.error("Server update transaction error:", err);
      }
    } catch (err) { console.error(err); }
  };

  const deleteTransaction = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3000/user/deleteExpense/${id}`, {
        method: "DELETE",
        headers: {
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        credentials: "include"
      });
      if (res.ok) {
        setPaginatedTransactions((prev) => prev.filter((t) => t._id !== id));
        fetchAllExpensesWithoutLimit();
      }
    } catch (err) { console.error(err); }
  };

  return (
    <TransactionContext.Provider value={{
      paginatedTransactions,
      allTransactions,
      pagination,
      loading,
      fetchPaginatedExpenses,
      fetchAllExpensesWithoutLimit,
      addTransaction,
      updateTransaction,
      deleteTransaction
    }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionContext);
}