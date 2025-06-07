"use client";

import React from "react";
import { get_report } from "@/service/api";
import { useRefreshStore } from "@/store/RefreshStore";

const ShowTabel = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = React.useState<any[]>([]);
  const {refresh} = useRefreshStore();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get_report();
        setData(res.data.data);
      } catch (error) {
        alert("خطا در دریافت گزارش");
        console.error(error);
      }
    };

    fetchData();
  }, [refresh]);

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  // تابع کمکی برای تعیین رنگ کارت بر اساس وضعیت
  function getStatusClasses(status: string) {
    switch (status) {
      case "حاضر":
        return "bg-green-100 border-green-400 text-green-800 border";
      case "غایب":
        return "bg-red-100 border-red-400 text-red-800 border";
      case "مرخصی":
        return "bg-yellow-100 border-yellow-400 text-yellow-800 border";
      case "تأخیر":
        return "bg-orange-100 border-orange-400 text-orange-800 border";
      default:
        return "bg-gray-100 border-gray-300 text-gray-800 border";
    }
  }

  return (
    <main className="min-h-screen w-screen bg-gray-100 p-8 text-right rounded-md">
      <h1 className="text-3xl font-extrabold text-center text-blue-900 mb-8">
        گزارش‌های ثبت شده
      </h1>

      {data.length === 0 ? (
        <p className="text-center text-gray-600 text-lg animate-pulse">
          در حال بارگذاری...
        </p>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((report) => (
            <article
              key={report.id}
              className={`rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ${getStatusClasses(
                report.status
              )}`}
            >
              <header className="mb-4 border-b border-blue-200 pb-2">
                <h2 className="text-xl font-semibold text-blue-800">
                  گزارش شماره {report.id}
                </h2>
                <time
                  dateTime={report.createdAt}
                  className="text-sm text-gray-500"
                >
                  {new Date(report.createdAt).toLocaleString("fa-IR")}
                </time>
              </header>

              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold text-blue-600">وضعیت:</span>{" "}
                  {report.status}
                </p>
                <p>
                  <span className="font-semibold text-blue-600">کارمند:</span>{" "}
                  {report.employee.name} (کد: {report.employee.employeeId})
                </p>
                <p>
                  <span className="font-semibold text-blue-600">شیفت:</span>{" "}
                  {report.shift.title}
                </p>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default ShowTabel;
