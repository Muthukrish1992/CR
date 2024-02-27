import * as React from "react";
import {
  registerWidget,
  registerLink,
  registerUI,
  IContextProvider,
  enableLocalization,
} from "./uxp";
import {
  TitleBar,
  FilterPanel,
  WidgetWrapper,
  DataTable,
} from "uxp/components";
import "./styles.scss";

interface IWidgetProps {
  uxpContext?: IContextProvider;
  instanceId?: string;
}

const Card: React.FC<{ label: string; count: number }> = ({ label, count }) => (
  <div
    style={{
      margin: "0 10px",
      height: "50px",
      width: "50%",
      padding: "10px",
      borderRadius: "5px",
      display: "flex",
      alignItems: "top", // Align items vertically in the center
      boxShadow: "0 2px 6px 2px rgba(0, 0, 0, 0.12)", // Add box shadow
    }}
  >
    <div style={{ flex: 1, fontSize: "14px" }}>{label}</div>{" "}
    <div
      style={{ flex: 1, textAlign: "right", color: "red", fontSize: "24px" }}
    >
      {count}
    </div>{" "}
  </div>
);

const CRWidget: React.FC<IWidgetProps> = (props) => {
  let CustomersList = [
    {
      RequestID: "test1",
      Facility: "Doon keng",
      Duration: "2 weeks",
      Status: "Closed",
    },
    {
      RequestID: "test2",
      Facility: "Doon keng",
      Duration: "3 weeks",
      Status: "Pending",
    },
    {
      RequestID: "test3",
      Facility: "Doon keng",
      Duration: "42 weeks",
      Status: "Closed",
    },
    {
      RequestID: "test4",
      Facility: "Doon keng",
      Duration: "5 weeks",
      Status: "Pending",
    },
  ];
  const pendingRequests = CustomersList.filter(
    (item) => item.Status === "Pending"
  );
  const closedRequests = CustomersList.filter(
    (item) => item.Status === "Closed"
  );
  return (
    <WidgetWrapper>
      <TitleBar title="Customer Requests">
        <FilterPanel />
      </TitleBar>
      <div
        style={{
          display: "flex",
          justifyContent: "center", // Equally space items
        }}
      >
        <Card label="Pending" count={pendingRequests.length} />
        <Card label="Closed" count={closedRequests.length} />
      </div>

      {pendingRequests.length > 0 && (
        <>
          <h2>Pending Requests</h2>
          <DataTable
            data={pendingRequests}
            pageSize={10}
            className="custom-data-table"
            columns={[
              {
                title: "RequestID",
                width: "10%",
                renderColumn: (item) => <div>{item.RequestID} </div>,
              },
              {
                title: "Facility",
                width: "15%",
                renderColumn: (item) => <div>{item.Facility} </div>,
              },
              {
                title: "Duration",
                width: "15%",
                renderColumn: (item) => <div>{item.Duration} </div>,
              },
              {
                title: "Status",
                width: "15%",
                renderColumn: (item) => (
                  <div
                    style={{
                      padding: "10px",
                      borderRadius: "25px",
                      backgroundColor: "#ffe18d",
                      color: "#d0a451",
                      textAlign: "center",
                      marginRight: "20px",
                    }}
                  >
                    {item.Status}{" "}
                  </div>
                ),
              },
            ]}
          />
        </>
      )}
      {closedRequests.length > 0 && (
        <>
          <h2>Closed Requests</h2>
          <DataTable
            data={closedRequests}
            pageSize={10}
            className="custom-data-table"
            columns={[
              {
                title: "RequestID",
                width: "10%",
                renderColumn: (item) => <div>{item.RequestID} </div>,
              },
              {
                title: "Facility",
                width: "15%",
                renderColumn: (item) => <div>{item.Facility} </div>,
              },
              {
                title: "Duration",
                width: "15%",
                renderColumn: (item) => <div>{item.Duration} </div>,
              },
              {
                title: "Status",
                width: "15%",
                renderColumn: (item) => (
                  <div
                    style={{
                      padding: "10px",
                      borderRadius: "25px",
                      backgroundColor: "#a8d799",
                      color: "#dcf7ce",
                      textAlign: "center",
                      marginRight: "20px",
                    }}
                  >
                    {item.Status}{" "}
                  </div>
                ),
              },
            ]}
          />
        </>
      )}
    </WidgetWrapper>
  );
};

/**
 * Register as a Widget
 */
registerWidget({
  id: "CR",
  widget: CRWidget,
  configs: {
    layout: {
      // w: 12,
      // h: 12,
      // minH: 12,
      // minW: 12
    },
  },
});

export default CRWidget;
