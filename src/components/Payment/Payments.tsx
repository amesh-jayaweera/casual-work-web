import React, {useEffect} from "react";
import MUIDataTable from "mui-datatables";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {getPaymentHistory} from "../../store/actions/tableActions";
import {TableLoading} from "../Common/Other/TableLoading";

console.error = () => {};

const columns = [
    {
        label: 'Date Time',
        name: 'dateTimeStr'
    },
    {
        label: 'Full Name',
        name: 'fullName',
        options : {
            filter : false
        }
    },
    {
        label: 'Applicant Email ID',
        name: 'userId',
        options : {
            filter : false
        }
    },
    {
        label: 'Bank Name',
        name: 'bankName'
    },
    {
        label: 'Branch Name',
        name: 'branchName'
    },
    {
        label: 'Account Number',
        name: 'accountNo',
        options : {
            filter : false
        }
    },
    {
        label: 'Paid Amount',
        name: 'amount'
    },
    {
        label: 'Action & Status',
        name: 'status',
        options: {
            filter: false
        }
    }
];

export function Payment() {

    const dispatch = useDispatch();
    const {loading, data } = useSelector((state: RootState) => state.paymentHistoryTable);

    useEffect(() => {
        dispatch(getPaymentHistory());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const options = {
        searchPlaceholder : "search ...",
        selectableRowsHeader : false,
        selectableRowsHideCheckboxes : true,
        textLabels: {
            body: {
                noMatch: loading ?
                    <TableLoading/> :
                    'Sorry, there is no matching data to display',
            },
        }
    };

    return (
        <div className="card-box mb-30 ">
            <MUIDataTable
                title={"Payments"}
                data={data}
                columns={columns}
                options={options}
                key={"table-payment"}
            />
        </div>
    )
}
