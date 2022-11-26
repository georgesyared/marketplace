import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { toast } from "react-toastify";
import ListingItem from "../components/ListingItem";

function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null)


  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get Reference
        const listingRef = collection(db, "listings");

        //create query
        const q = query(
          listingRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        //Execute Query
        const querySnap = await getDocs(q);

        const lastVisible = querySnap.docs[querySnap.docs.length -1]
        setLastFetchedListing(lastVisible)

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
  }, [params.categoryName]);


  //Pagination/ Load More
  const onFetchMoreListings = async () => {
    try {
      //Get Reference
      const listingRef = collection(db, "listings");

      //create query
      const q = query(
        listingRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(10)
      );

      //Execute Query
      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisible)

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings((prevState)=> [...prevState, ...listings]);
      setLoading(false);
    
    } catch (err) {
      toast.error("Cannot fetch the data");
    }
  };

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === "rent"
            ? "Places for rent"
            : "Places for sales"}
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

        <br />

        {lastFetchedListing && (
          <p className="loadMore" onClick={onFetchMoreListings}></p>
        )}
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
}

export default Category;
