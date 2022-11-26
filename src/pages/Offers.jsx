import React from "react";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { toast } from "react-toastify";
import ListingItem from "../components/ListingItem";

function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get Reference
        const listingRef = collection(db, "listings");

        //create query
        const q = query(
          listingRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );
 
        //Execute Query
        const querySnap = await getDocs(q);

        let listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      
      } catch (err) {
        toast.error("Cannot fetch the data");
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          Offers
        </p>
      </header>

      {loading ? (
        <h3>Loading...</h3>
      ) : listings && listings?.length > 0 ? (
        <>
        <main>
            <ul className="categoryListings">
                {listings?.map((listing)=> (
                   <ListingItem listing={listing.data} key={listing.id} id={listing.id} />
                ))}
            </ul>
        </main>
        </>
      ) : (
        <p>No Offers</p>
      )}
    </div>
  );
}

export default Offers;