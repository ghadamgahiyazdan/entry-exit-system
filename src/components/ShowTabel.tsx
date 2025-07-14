"use client";

import React from "react";
import { get_report, dell_report } from "@/service/api";
import { useRefreshStore } from "@/store/RefreshStore";

const ShowTabel = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = React.useState<any[]>([]);
  const { refresh, setRefresh } = useRefreshStore();
  const [isDeleting, setIsDeleting] = React.useState(false);

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

  const handleDelete = async (reportId: number) => {
    if (!confirm("آیا از حذف این گزارش اطمینان دارید؟")) {
      return;
    }

    setIsDeleting(true);
    try {
      await dell_report({ reportId });
      alert("گزارش با موفقیت حذف شد");
      setRefresh(); // Trigger refresh to update the list
    } catch (error) {
      console.error("خطا در حذف گزارش:", error);
      alert("خطا در حذف گزارش");
    } finally {
      setIsDeleting(false);
    }
  };

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
              className={`rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 relative ${getStatusClasses(
                report.status
              )}`}
            >
              <button
                onClick={() => handleDelete(report.id)}
                disabled={isDeleting}
                className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors disabled:opacity-50"
              >
                {isDeleting ? "در حال حذف..." : "حذف"}
              </button>

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

export default ShowTabel;