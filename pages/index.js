import Head from "next/head";
import Airtable from "airtable";
import EventStats from "../components/EventStats";
import { v4 as uuidv4 } from "uuid";
import CustomChart from "../components/CustomChart";

export async function getServerSideProps(context) {
  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const corvette = Airtable.base(process.env.CORVETTE_BASE);
  const porsche = Airtable.base(process.env.PORSCHE_BASE);
  const toyota = Airtable.base(process.env.TOYOTA_BASE);
  const goldenticket = Airtable.base(process.env.GOLDENTICKET_BASE);

  const corvettePhysical = await corvette("Physical").select().all();
  const corvetteDigital = await corvette("Digital").select().all();
  const porscheDigital = await porsche("Digital").select().all();
  const porschePhysical = await porsche("Physical").select().all();
  const toyotaPhysical = await toyota("Physical").select().all();
  const toyotaDigital = await toyota("Digital").select().all();
  const goldenticketEntries = await goldenticket("Entries").select().all();

  const allRecords = {
    corvette: [
      {
        name: "On-Site",
        records: JSON.stringify(corvettePhysical),
        key: uuidv4(),
      },
      {
        name: "Virtual",
        records: JSON.stringify(corvetteDigital),
        key: uuidv4(),
      },
    ],
    porsche: [
      {
        name: "On-Site",
        records: JSON.stringify(porschePhysical),
        key: uuidv4(),
      },
      {
        name: "Virtual",
        records: JSON.stringify(porscheDigital),
        key: uuidv4(),
      },
    ],
    toyota: [
      {
        name: "On-Site",
        records: JSON.stringify(toyotaPhysical),
        key: uuidv4(),
      },
      {
        name: "Virtual",
        records: JSON.stringify(toyotaDigital),
        key: uuidv4(),
      },
    ],
    goldenticket: [
      {
        name: "On-Site",
        records: JSON.stringify(goldenticketEntries),
        key: uuidv4(),
      },
    ],
  };
  return {
    props: {
      events: allRecords,
    },
  };
}

export default function Home({ events }) {
  return (
    <div>
      <Head>
        <title>Dashboard - Unconventionally Driven</title>
      </Head>
      <div className="bg-black py-5 mb-4">
        <h1 className="text-3xl text-center text-white customUnderline max-w-max mx-auto">
          SEMA 2021
        </h1>
      </div>
      <div className="px-4 max-w-3xl mx-auto">
        <div>
          <CustomChart dataset={events} />
        </div>
        <div className="mb-6">
          <h2 className="uppercase bg-red-100 max-w-max px-2 rounded-full text-red-700 mb-4">
            Corvette
          </h2>
          <EventStats color="bg-red-500" tables={events.corvette} />
        </div>
        <div className="mb-6">
          <h2 className="uppercase bg-blue-100 max-w-max px-2 rounded-full text-blue-700 mb-4">
            Porsche
          </h2>
          <EventStats color="bg-blue-500" tables={events.porsche} />
        </div>
        <div className="mb-6">
          <h2 className="uppercase bg-green-100 max-w-max px-2 rounded-full text-green-700 mb-4">
            Toyota
          </h2>
          <EventStats color="bg-green-500" tables={events.toyota} />
        </div>
        <div className="mb-6">
          <h2 className="uppercase bg-yellow-100 max-w-max px-2 rounded-full text-yellow-700 mb-4">
            Mobil 1 Golden Ticket
          </h2>
          <EventStats color="bg-yellow-500" tables={events.goldenticket} />
        </div>
      </div>
    </div>
  );
}
