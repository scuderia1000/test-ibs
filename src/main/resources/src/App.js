import React from "react";
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDataGrid from 'react-data-grid';
import {Editors, Toolbar} from 'react-data-grid-addons';
import Paper from "material-ui/Paper";
import Snackbar from "material-ui/Snackbar";

const {AutoComplete: AutoCompleteEditor} = Editors;

let numberer = 0;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [
                {
                    number: ++numberer,
                    name: 'Доставка',
                    toWhom: 'Вилл Смит',
                    fromWhom: 'Озеров Иван Христофорович',
                    status: 'Создана'
                },
                {
                    number: ++numberer,
                    name: 'Ремонт',
                    toWhom: 'Дэвид Грол',
                    fromWhom: 'Недолин Мартын Акимович',
                    status: 'В работе'
                },
                {
                    number: ++numberer,
                    name: 'Монтаж',
                    toWhom: 'Стив Джобс',
                    fromWhom: 'Никитин Андрей Афанасьевич',
                    status: 'Подтверждена'
                },
                {
                    number: ++numberer,
                    name: 'Перемещение',
                    toWhom: 'Билл Гейтс',
                    fromWhom: 'Мосолов Александр Николаевич',
                    status: 'Обновлена'
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
        const {openSnack} = this.state;
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

        axios.post('api/create')
            .then((response) => {
                this.setState({
                    openSnack: !openSnack,
                    text: 'Добавлена навая заявка'
                })
            }).catch((error) => {
            console.log(error);
        });

    };

    handleDelete = (id) => {
        const {openSnack} = this.state;
        let tickets = this.state.tickets.slice();
        this.state.tickets.forEach((item, index) => {
            if (item.number == id) {
                tickets.splice(index, 1);
            }
        });
        if (this.state.selectedTicket.number && this.state.selectedTicket.number == id) {
            this.setState({
                tickets: tickets,
                selectedTicket: {}
            });
        } else {
            this.setState({
                tickets: tickets
            });
        }

        axios.get(
            'api/delete',
            {params: {id: id}}
        ).then((response) => {
            this.setState({
                openSnack: !openSnack,
                text: 'Заявка номер ' + id + ' удалена'
            })
        }).catch((error) => {
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
        const {number = '', name = '', toWhom = [], fromWhom = [], status = [], openSnack, selectedTicket} = this.state;

        const toWhomEditor = toWhom.length > 0 ? <AutoCompleteEditor options={toWhom}/> : '';
        const fromWhomEditor = fromWhom.length > 0 ? <AutoCompleteEditor options={fromWhom}/> : '';
        const statusEditor = status.length > 0 ? <AutoCompleteEditor options={status}/> : '';

        const columns = [
            {
                key: 'number',
                name: 'Номер',
                width: 80
            },
            {
                key: 'name',
                name: 'Наименование',
                editable: true
            },
            {
                key: 'toWhom',
                name: 'Кому',
                editor: toWhomEditor
            },
            {
                key: 'fromWhom',
                name: 'От кого',
                editor: fromWhomEditor
            },
            {
                key: 'status',
                name: 'Статус',
                editor: statusEditor
            },
            {
                name: 'Действие',
                key: 'delete',
                getRowMetaData: (row) => row,
                formatter: ({dependentValues}) => (
                    <span>
          <a href="javascript:;" onClick={() => this.handleDelete(dependentValues.number)}>Удалить</a>
        </span>
                ),
            }

        ];

        return (
            <div style={{
                display: "flex",
                position: 'relative',
                zIndex: 5,
                height: '100%',
                background: 'rgb(218, 222, 223)',
                paddingBottom: '78px',
                boxSizing: 'border-box',
                flexDirection: 'column',
                padding: '50px 25px 20px',
            }}>
                <Paper style={{
                    position: 'relative', top: -30, height: '100%', zIndex: 1, padding: '0',
                    display: 'flex', flexDirection: 'column', alignItems: 'center'
                }}>
                <span style={{fontFamily: 'Roboto', fontSize: '200%'}}>Заявка</span>
                <div style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                    padding: '50px 25px 20px', position: 'relative', alignSelf: 'normal'
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
                    <RaisedButton
                        style={{
                            marginTop: 'auto'
                        }}
                        label="Очистить"
                        primary={true}
                        onClick={this.handleClear}
                    />
                </div>
                </Paper>
                <Paper style={{
                    position: 'relative', height: '100%', zIndex: 1, padding: '0',
                    display: 'flex', flexDirection: 'column',
                }}>
                <div style={{
                    padding: '50px 25px 20px',
                    alignItems: 'center',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    position: 'relative'
                }}
                >
                    <ReactDataGrid
                        enableCellSelect={true}
                        columns={columns}
                        rowGetter={this.rowGetter}
                        rowsCount={this.state.tickets.length}
                        //minWidth={1024}
                        minHeight={500}
                        onGridRowsUpdated={this.handleGridRowsUpdated}
                        onRowSelect={this.handleCellClick}
                        onRowClick={this.handleCellClick}
                        toolbar={<Toolbar addRowButtonText='Добавить строку' onAddRow={this.handleSave}/>}
                    />

                </div>
                </Paper>
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
