import React from 'react';
import axios from 'axios';
import './App.css';
import GroupBookmark from './components/GroupBookmark.component';
import { Button } from 'reactstrap';
import { Modal, Form, Input, Select } from 'antd'

class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            data: [],
            visibleModalAdd: false,
            title: '',
            link: '',
        }
        this.nameGroup = '';
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

    handleTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    handleLink = (e) => {
        this.setState({
            link: e.target.value
        })
    }


    handleChange = (value) => {
        this.nameGroup = value;
    }

    handleOk = () => {

        const obj = { id: "15", title: this.state.title, links: this.state.link }

        let mang = this.state.data;
        for (var i = 0; i < mang.length; i++) {
            if (this.nameGroup === mang[i].name) {
                mang[i].bookmarks.push(obj);
            }
        }

        console.log(mang, 'mang can su dung')

        console.log(this.nameGroup, 'nameGroup')
        this.setState({
            visibleModalAdd: false,
            data: mang
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
                    <Form
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        layout="horizontal"
                    >
                        <Form.Item label="title">
                            <Input type="text" onChange={this.handleTitle} />
                        </Form.Item>
                        <Form.Item label="link">
                            <Input type="text" onChange={this.handleLink} />
                        </Form.Item>
                        <Form.Item label="Select">
                            <Select onChange={this.handleChange} >
                                {
                                    data.map((item, index) => (
                                        <Select.Option key={index} value={item.name}>{item.name} </Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>

                    </Form>
                </Modal>
            </div>


        );
    }
}

export default App;
