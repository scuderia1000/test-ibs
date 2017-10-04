import React from "react";
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {
    Table,
    TableHeaderColumn,
    TableRow,
    TableHeader,
    TableRowColumn,
    TableBody
} from 'material-ui/Table';
import EditTable from 'material-ui-table-edit';
import ReactDataGrid from 'react-data-grid';
import {Editors, Formatters, Toolbar} from 'react-data-grid-addons';
import Snackbar from "material-ui/Snackbar";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const {AutoComplete: AutoCompleteEditor, DropDownEditor} = Editors;
const {DropDownFormatter} = Formatters;

const TICKETS = [
    {id: 0, number: 10, name: 'Joe', toWhom: {1: 'UPDATED'}, fromWhom: 45, status: 'created'},
    {id: 1, number: 20, name: 'Barack', toWhom: {0: 'CREATED'}, fromWhom: 54, status: 'created'},
    {id: 2, number: 30, name: 'Crystal', toWhom: {1: 'UPDATED'}, fromWhom: 34, status: 'created'},
    {id: 3, number: 40, name: 'James', toWhom: {1: 'UPDATED'}, fromWhom: 33, status: 'created'}
];

const headers = [
    {value: 'Number', type: 'TextField', width: 200},
    {value: 'Name', type: 'TextField', width: 200},
    {value: 'To Whom', type: 'Menu', width: 200},
    {value: 'From Whom', type: 'DropDownMenu', width: 200},
    {value: 'Status', type: 'TextField', width: 200},
];

let numberer = 0;


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [
                {
                    number: ++numberer,
                    name: 'Joe',
                    toWhom: 'WILL_SMITH',
                    fromWhom: 'NAUMOVA_ANNA',
                    status: 'CREATED'
                },
                {
                    number: ++numberer,
                    name: 'Barack',
                    toWhom: 'WILL_SMITH',
                    fromWhom: 'NAUMOVA_ANNA',
                    status: 'CREATED'
                },
                {
                    number: ++numberer,
                    name: 'Crystal',
                    toWhom: 'WILL_SMITH',
                    fromWhom: 'NAUMOVA_ANNA',
                    status: 'CREATED'
                },
                {
                    number: ++numberer,
                    name: 'James',
                    toWhom: 'WILL_SMITH',
                    fromWhom: 'NAUMOVA_ANNA',
                    status: 'CREATED'
                }
            ],
            selectedTicket: {},
            openSnack: false, text: ""
        }
    }

    componentDidMount() {
        this.getComboboxes();
    }

    getComboboxes = () => {
        this.requestCombobox("toWhom");
        this.requestCombobox("fromWhom");
        this.requestCombobox("status");
    };

    requestCombobox = (type) => {
        axios.get('api/getCombo/' + type)
            .then((response) => {
                console.log(response);
                let combo = [];
                if (response.data) {
                    response.data.forEach((item, index) => {
                        combo.push({id: index, title: item});
                    })
                }
                this.setState({
                    [type]: combo,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    };

    handleComboChange = (event, index, obj) => {
        debugger
        console.log(obj.text);
    };

    handleCellClick = (rowNumber, data, event) => {
        if (event.key === 'delete') return;
        const ticketId = data.number;
        let ticket = {};
        this.state.tickets.forEach((item, index) => {
            if (item.number == ticketId) {
                ticket = item;
            }
        });

        this.setState({
            selectedTicket: ticket
        })
    };

    handleSave = () => {
        const newRow = {
            number: ++numberer,
            name: '',
            toWhom: '',
            fromWhom: '',
            status: ''
        };
        let tickets = this.state.tickets.slice();
        tickets.push(newRow);
        this.setState({
            tickets: tickets
        });

        axios.post(
            'api/create', {
                firstName: this.state.firstName,
                lastName: this.state.lastName
            }).then((response) => {

        })
            .catch((error) => {
                console.log(error);
            });

    };

    handleDelete = (id) => {
        let ticketToDelete = {};
        let tickets = this.state.tickets.slice();
        const ticket = this.state.tickets.forEach((item, index) => {
            if (item.number == id) {
                ticketToDelete = item;
                tickets.splice(index, 1);
            }
        });
        this.setState({
            tickets: tickets
        });

        axios.get(
            'api/delete',
            {params: {id: id}}
        ).then((response) => {

        })
            .catch((error) => {
                console.log(error);
            });

    };

    rowGetter = (i) => {
        return this.state.tickets[i];
    };

    handleGridRowsUpdated = (data) => {
        const ticketNumber = data.fromRowData.number;
        const updateCell = data.updated;
        const updateKey = Object.keys(updateCell);

        let tickets = this.state.tickets.slice();

        let ticket = {};
        this.state.tickets.forEach((item, index) => {
            if (item.number == ticketNumber) {
                ticket = item;
                ticket[updateKey] = updateCell[updateKey];
                tickets.splice(index, 1, ticket);
            }
        });
        this.setState({
            tickets: tickets
        });
    };

    handleClear = () => {

        this.setState({
            selectedTicket: {}
        });
    };

    render() {
        const {number = '', name = '', toWhom = [], fromWhom = [], status = [], tickets, openSnack, selectedTicket} = this.state;

        const toWhomValue = selectedTicket.toWhom ? selectedTicket.toWhom : '';
        const fromWhomValue = selectedTicket.fromWhom ? selectedTicket.fromWhom : '';
        const statusValue = selectedTicket.status ? selectedTicket.status : '';

        let isDisabled = true;
        if (tickets && tickets.length > 0) {
            isDisabled = !isDisabled;
        }

        const createDelButton = (id) => {
            return <RaisedButton
                style={{
                    marginTop: 'auto'
                }}
                label="Delete"
                primary={true}
                onClick={() => {
                    this.handleDelete(id)
                }}
            />
        };

        const toWhomEditor = toWhom.length > 0 ? <AutoCompleteEditor options={toWhom}/> : '';
        const fromWhomEditor = fromWhom.length > 0 ? <AutoCompleteEditor options={fromWhom}/> : '';
        const statusEditor = status.length > 0 ? <AutoCompleteEditor options={status}/> : '';

        const columns = [
            {
                key: 'number',
                name: 'Number',
                width: 80
            },
            {
                key: 'name',
                name: 'Name',
                editable: true
            },
            {
                key: 'toWhom',
                name: 'To Whom',
                editor: toWhomEditor
            },
            {
                key: 'fromWhom',
                name: 'From Whom',
                editor: fromWhomEditor
            },
            {
                key: 'status',
                name: 'Status',
                editor: statusEditor
            },
            {
                name: 'Actions',
                key: 'delete',
                getRowMetaData: (row) => row,
                formatter: ({dependentValues}) => (
                    <span>
          <a href="javascript:;" onClick={() => this.handleDelete(dependentValues.number)}>Delete</a>
        </span>
                ),
            }

        ];

        /*let rows = [];

         this.state.tickets.forEach((item) => {
         const keys = Object.keys(item);
         let columns = keys.map((row, index) => {
         return {value: item[row]}
         });
         return rows.push({columns: columns})
         });*/

        return (
            <div style={{
                padding: '50px 25px 20px',
                alignItems: 'center',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }}>
                <span style={{fontFamily: 'Roboto', fontSize: '200%'}}>Заявка</span>
                <div style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
                }}>
                    <TextField
                        style={{
                            flex: 1,
                            //marginTop: 18,
                            marginRight: 50
                        }}
                        disabled={true}
                        name="number"
                        value={selectedTicket.number ? selectedTicket.number : ''}
                        floatingLabelText="Номер"
                        onChange={this.handleChange}
                    />
                    <TextField
                        style={{
                            flex: 1,
                            //marginTop: 18,
                            marginRight: 50
                        }}
                        disabled={true}
                        name="name"
                        value={selectedTicket.name ? selectedTicket.name : ''}
                        floatingLabelText="Наименование"
                        onChange={this.handleChange}
                    />
                    <TextField
                        style={{
                            flex: 1,
                            marginRight: 50
                        }}
                        name="toWhom"
                        disabled={true}
                        value={selectedTicket.toWhom ? selectedTicket.toWhom : ''}
                        floatingLabelText="Кому"
                        onChange={this.handleChange}
                    />
                    <TextField
                        style={{
                            flex: 1,
                            marginRight: 50
                        }}
                        name="fromWhom"
                        disabled={true}
                        value={selectedTicket.fromWhom ? selectedTicket.fromWhom : ''}
                        floatingLabelText="От кого"
                        onChange={this.handleChange}
                    />
                    <TextField
                        style={{
                            flex: 1,
                            marginRight: 50
                        }}
                        name="status"
                        disabled={true}
                        value={selectedTicket.status ? selectedTicket.status : ''}
                        floatingLabelText="Статус"
                        onChange={this.handleChange}
                    />
                    {/*<div style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                        marginTop: 25
                    }}>
                        <div style={{
                            display: 'flex', flexDirection: 'column', marginRight: 50
                        }}>Кому
                            <AutoCompleteEditor value={toWhomValue} options={toWhom}/>
                        </div>
                        <div style={{
                            display: 'flex', flexDirection: 'column', marginRight: 50
                        }}>От кого
                            <AutoCompleteEditor value={fromWhomValue} options={fromWhom}/>
                        </div>
                        <div style={{
                            display: 'flex', flexDirection: 'column', marginRight: 50
                        }}>Статус
                            <AutoCompleteEditor value={statusValue} options={status}/>
                        </div>
                    </div>*/}
                    {/*<div style={{
                        marginTop: 44
                    }}>*/}
                        <RaisedButton
                            style={{
                                marginTop: 'auto'
                            }}
                            label="Очистить"
                            primary={true}
                            onClick={this.handleClear}
                        />
                    {/*</div>*/}

                    {/*<RaisedButton
                     style={{
                     //marginTop: 'auto'
                     }}
                     label="Save"
                     primary={true}
                     onClick={this.handleSave}
                     />*/}
                </div>


                <div style={{
                    height: 500,
                    //overflowY: 'auto',
                    display: 'flex',
                    marginTop: 50
                }}
                >
                    <ReactDataGrid
                        enableCellSelect={true}
                        columns={columns}
                        rowGetter={this.rowGetter}
                        rowsCount={this.state.tickets.length}
                        minWidth={1024}
                        minHeight={500}
                        onGridRowsUpdated={this.handleGridRowsUpdated}
                        onRowSelect={this.handleCellClick}
                        onRowClick={this.handleCellClick}
                        toolbar={<Toolbar onAddRow={this.handleSave}/>}
                    />

                    {/*<Table
                     selectable={true}
                     onCellClick={this.handleCellClick}>
                     <TableHeader
                     displaySelectAll={false}
                     adjustForCheckbox={false}
                     >
                     <TableRow>
                     <TableHeaderColumn colSpan="6" tooltip="Список заявок"
                     style={{textAlign: 'center', fontSize: '150%'}}>
                     Список заявок
                     </TableHeaderColumn>
                     </TableRow>
                     <TableRow>
                     <TableHeaderColumn>Number</TableHeaderColumn>
                     <TableHeaderColumn>Name</TableHeaderColumn>
                     <TableHeaderColumn>To Whom</TableHeaderColumn>
                     <TableHeaderColumn>From Whom</TableHeaderColumn>
                     <TableHeaderColumn>Status</TableHeaderColumn>
                     </TableRow>
                     </TableHeader>
                     <TableBody displayRowCheckbox={false} deselectOnClickaway={false}>
                     {this.state.tickets.map((row, index) => (
                     <TableRow key={index}>
                     <TableRowColumn key={index} style={{display: 'none'}}
                     data-my-row-identifier={row.id}>{row.id}</TableRowColumn>
                     <TableRowColumn key={index}
                     data-my-row-identifier={row.id}>{row.number}</TableRowColumn>
                     <TableRowColumn key={index}
                     data-my-row-identifier={row.id}>{row.name}</TableRowColumn>
                     <TableRowColumn key={index}
                     data-my-row-identifier={row.id}>{Object.keys(row.toWhom).map((key) => {
                     return row.toWhom[key]
                     })}</TableRowColumn>
                     <TableRowColumn key={index}
                     data-my-row-identifier={row.id}>{Object.keys(row.fromWhom).map((key) => {
                     return row.fromWhom[key]
                     })}</TableRowColumn>
                     <TableRowColumn key={index}
                     data-my-row-identifier={row.id}>{Object.keys(row.status).map((key) => {
                     return row.status[key]
                     })}</TableRowColumn>

                     <TableRowColumn>{createDelButton(row.id)}</TableRowColumn>
                     </TableRow>
                     ))}
                     </TableBody>
                     </Table>*/}
                </div>
                <Snackbar
                    open={openSnack}
                    message={this.state.text}
                    autoHideDuration={5000}
                    onRequestClose={() => {
                        this.setState({openSnack: false, text: ""})
                    }}
                    bodyStyle={{minHeight: '48px', lineHeight: '24px', height: '', padding: '10px 24px 6px'}}
                />
            </div>
        )
    }
}

export default App;
