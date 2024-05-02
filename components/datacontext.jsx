import React, { createContext, useContext, useState } from "react";
const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [wallet, setWallet] = useState('')
    const [userData, setUserData] = useState(null)
    const [imageuri, setImageuri] = useState(null)
    const [s3URL, setS3URL] = useState(null);
    const [identityName, setIdentityName] = useState(null)
    const [metaData, setMetaData] = useState(null)
    const [tokenIds, setTokenIds] = useState(null);
    const [clickedItem, setClickedItem] = useState(null);
    const [balance, setBalance] = useState(null);
    const [talentSelected, setTalentSelected] = useState(false);
    const [clientSelected, setClientSelected] = useState(false);
    const [allBounties, setAllBounties] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fileUpload, setFileUpload] = useState();
    const [dueDate, setDueDate] = useState(new Date());
    const [selectedBounty, setSelectedBounty] = useState();

  return (
    <DataContext.Provider value={{ wallet, setWallet, userData, setUserData, imageuri, setImageuri, s3URL, setS3URL, identityName, setIdentityName, metaData, setMetaData, 
    tokenIds, setTokenIds, clickedItem, setClickedItem, balance, setBalance,
    talentSelected, setTalentSelected,
    clientSelected, setClientSelected,
    allBounties, setAllBounties,
    title, setTitle,
    description, setDescription,
    fileUpload, setFileUpload,
    dueDate, setDueDate,
    selectedBounty, setSelectedBounty
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
