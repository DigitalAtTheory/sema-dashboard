import { useState, useEffect } from "react";
import Head from "next/head";
import {
  rosiePhysical,
  rosieVirtual,
  hoonPhysical,
  hoonVirtual,
  stoutPhysical,
  stoutVirtual,
} from "../firebase/db";
import { getDocs, onSnapshot } from "firebase/firestore";

import EventCard from "../components/EventCard";

export async function getServerSideProps(context) {
  const rosiePData = await getData(rosiePhysical);
  const rosieVData = await getData(rosieVirtual);
  const stoutPData = await getData(stoutPhysical);
  const stoutVData = await getData(stoutVirtual);
  const hoonPData = await getData(hoonPhysical);
  const hoonVData = await getData(hoonVirtual);

  async function getData(ref) {
    const snapshot = await getDocs(ref);
    const data = snapshot.docs.map((doc) => doc.data());

    return data;
  }
  return {
    props: {
      rosiePData,
      rosieVData,
      stoutPData,
      stoutVData,
      hoonPData,
      hoonVData,
    },
  };
}

export default function Home({
  rosiePData,
  rosieVData,
  stoutPData,
  stoutVData,
  hoonPData,
  hoonVData,
}) {
  const [rosieP, setRosieP] = useState(rosiePData);
  const [rosieV, setRosieV] = useState(rosieVData);
  const [stoutP, setStoutP] = useState(stoutPData);
  const [stoutV, setStoutV] = useState(stoutVData);
  const [hoonP, setHoonP] = useState(hoonPData);
  const [hoonV, setHoonV] = useState(hoonVData);

  useEffect(() => {
    const rosiePUnsub = onSnapshot(rosiePhysical, (querySnapshot) => {
      setRosieP(querySnapshot.docs.map((doc) => doc.data()));
    });
    const rosieVUnsub = onSnapshot(rosieVirtual, (querySnapshot) => {
      setRosieV(querySnapshot.docs.map((doc) => doc.data()));
    });
    const stoutPUnsub = onSnapshot(stoutPhysical, (querySnapshot) => {
      setStoutP(querySnapshot.docs.map((doc) => doc.data()));
    });
    const stoutVUnsub = onSnapshot(stoutVirtual, (querySnapshot) => {
      setStoutV(querySnapshot.docs.map((doc) => doc.data()));
    });
    const hoonPUnsub = onSnapshot(hoonPhysical, (querySnapshot) => {
      setHoonP(querySnapshot.docs.map((doc) => doc.data()));
    });
    const hoonVUnsub = onSnapshot(hoonVirtual, (querySnapshot) => {
      setHoonV(querySnapshot.docs.map((doc) => doc.data()));
    });

    return () => {
      rosiePUnsub();
      rosieVUnsub();
      stoutPUnsub();
      stoutVUnsub();
      hoonPUnsub();
      hoonVUnsub();
    };
  }, []);

  return (
    <div>
      <Head>
        <title>Dashboard - SEMA</title>
      </Head>
      <div className="bg-black py-5 mb-4">
        <h1 className="text-3xl text-center text-white customUnderline max-w-max mx-auto">
          SEMA 2022
        </h1>
      </div>
      <div className="max-w-5xl px-4 mx-auto">
        <div className="mb-12 md:mb-0">
          <h2 className="font-bold uppercase bg-red-100 max-w-max px-2 rounded-full text-red-700 mb-4">
            Virtual Entries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8  md:gap-12">
            <EventCard
              letter="R"
              title="Rosie"
              numberOfEntries={rosieV.length}
            />
            <EventCard
              letter="S"
              title="Stout"
              numberOfEntries={stoutV.length}
            />
            <EventCard
              letter="H"
              title="Hoonipigasus"
              numberOfEntries={hoonV.length}
            />
          </div>
        </div>
        <div className="mb-12 md:mb-0">
          <h2 className="font-bold uppercase bg-blue-100 max-w-max px-2 rounded-full text-blue-700 mb-4">
            On-site Entries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8  md:gap-12">
            <EventCard
              letter="R"
              title="Rosie"
              numberOfEntries={rosieP.length}
            />
            <EventCard
              letter="S"
              title="Stout"
              numberOfEntries={stoutP.length}
            />
            <EventCard
              letter="H"
              title="Hoonipigasus"
              numberOfEntries={hoonP.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
