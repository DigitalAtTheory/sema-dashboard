import { Bar } from "react-chartjs-2";

export default function CustomChart({ dataset }) {
  const data = {
    labels: [
      "Corvette-Onsite",
      "Corvette-Virtual",
      "Porsche-Onsite",
      "Porsche-Virtual",
      "Toyota-Onsite",
      "Toyota-Virtual",
      "Golden Ticket",
    ],
    datasets: [
      {
        label: "# of Entries",
        data: [
          JSON.parse(dataset.corvette[0].records).length,
          JSON.parse(dataset.corvette[1].records).length,
          JSON.parse(dataset.porsche[0].records).length,
          JSON.parse(dataset.porsche[1].records).length,
          JSON.parse(dataset.toyota[0].records).length,
          JSON.parse(dataset.toyota[1].records).length,
          JSON.parse(dataset.goldenticket[0].records).length,
        ],
        backgroundColor: [
          "rgba(239, 68, 68, 0.2)",
          "rgba(239, 68, 68, 0.2)",
          "rgba(58, 130, 246, 0.2)",
          "rgba(58, 130, 246, 0.2)",
          "rgba(27, 185, 129, 0.2)",
          "rgba(27, 185, 129, 0.2)",
          "rgba(244, 158, 36, 0.2)",
        ],
        borderColor: [
          "rgba(239, 68, 68, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(58, 130, 246, 1)",
          "rgba(58, 130, 246, 1)",
          "rgba(27, 185, 129, 1)",
          "rgba(27, 185, 129, 1)",
          "rgba(244, 158, 36, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className="mb-10 mr-4">
      <Bar data={data} options={options} />
    </div>
  );
}
