import { Card, CardContent, Typography } from "@mui/material";

const PerformanceChart = () => {
  const performances = [
    { label: "Org performance", value: 85, color: "bg-teal-400" }, // Tailwind teal color
    { label: "Vehicle performance", value: 85, color: "bg-teal-400" }, // Tailwind teal color
    { label: "Driver performance", value: 48, color: "bg-yellow-400" }, // Tailwind yellow color
    { label: "Overall performance", value: 48, color: "bg-blue-400" }, // Tailwind blue color
  ];

  return (
    <div className="flex justify-center items-center h-full">
      <Card className=" h-full w-full">
        <CardContent className="flex flex-col justify-between h-full">
          <p className="font-redhat font-semibold text-sm mb-4">ABC Company</p>
          <div className="space-y-6">
            {performances.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <p className="font-redhat font-normal text-sm text-[#777777] w-[50%]">
                  {item.label}
                </p>
                <div className="w-[30%] mx-4">
                  <div className="w-full bg-gray-200 h-3 ">
                    <div
                      className={`${item.color} h-5`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
                <Typography variant="body2" className="text-gray-600">
                  {item.value}%
                </Typography>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceChart;
