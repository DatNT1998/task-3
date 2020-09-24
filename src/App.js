import React from 'react';
import axios from 'axios';
import './App.css';
import GroupBookmark from './components/GroupBookmark.component';
import { Button } from 'reactstrap';
import { Modal } from 'antd'

class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            visibleModalAdd: false
        }
    }

    componentDidMount() {

        axios.get(`http://localhost:3000/data`)
            .then(res => {
                const data = res.data;
                this.setState({ data });
                console.log(this.state.data, 'ahihi');
            })
            .catch(error => console.log(error));
    }


    showModalAdd = () => {
        this.setState({
            visibleModalAdd: true
        })
    }

    handleCancel = () => {
        this.setState({
            visibleModalAdd: false
        })
    }

    render() {
        const { data, visibleModalAdd } = this.state;
        return (
            <div className="container">
                <div className="header">
                    <Button color="primary" className="button-add" onClick={this.showModalAdd}> Add Bookmark </Button>
                    <h1 className="main-title"> Bookmarks </h1>
                </div>
                <GroupBookmark data={data} />
                <Modal
                    visible={visibleModalAdd}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p> Modal Add</p>
                </Modal>
            </div>


        );
    }
}

export default App;
