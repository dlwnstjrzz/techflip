import CompareClient from "./client";

export default function ComparePage({ params }) {
  return <CompareClient id={params.id} />;
}
