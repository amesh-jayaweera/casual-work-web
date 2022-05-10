import React from "react";
import MUIDataTable from "mui-datatables";

const columns = [
    {
        label: 'Date',
        name: 'date'
    },
    {
        label: 'Name',
        name: 'name'
    },
    {
        label: 'Email',
        name: 'email',
        options : {
            display : false
        }
    },
    {
        label: 'Job',
        name: 'job'
    },
    {
        label: 'Amount Need To Be Paid',
        name: 'amount'
    },
    {
        label: 'Payment Completion',
        name: 'paymentCompletion'
    },
    {
        label: 'Action & Status',
        name: 'status',
        options: {
            filter: false
        }
    }
];

const options = {
    searchPlaceholder : "search ...",
    selectableRowsHeader : false,
    selectableRowsHideCheckboxes : true
};

export function Payment() {

    const data = [
        ['21sth of May 2021','Amesh Jayaweera', 'ameshmbjyw97@gmail.com', 'Java Developer', 3000.00,
            new Date().toISOString(),
            <div className="badge badge-dgreen text-white">Payment Completed</div>],
        ['21sth of May 2021','Shenali Thathsarani', 'shenali98@gmail.com', 'UI/UX Developer', 2500.00,
            new Date().toISOString(),
            <div className="badge badge-dpurple text-white">Proceed Payment</div>],
    ];

    return (
        <div className="card-box mb-30 ">
            <MUIDataTable
                title={"Payments"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}
