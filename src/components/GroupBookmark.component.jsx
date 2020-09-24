import React, { Component } from 'react';
import axios from 'axios';
import Bookmark from './bookmark.component';

import { Modal } from 'antd';

class GroupBookmark extends Component {
    currentGroupId = -1;
    constructor(props) {
        super();

        this.state = {
            data: [],
            visibleModalDel: false,
            currentId: undefined
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

    showModal = (id) => {
        this.setState({
            visibleModalDel: true,
            currentId: id,
        })
    }

    handleOk = () => {

        const dataRemain = this.state.data;
        console.log(this.currentGroupId, 'kkkkkkkkkkkkkkkkkkkkk')
        dataRemain[this.currentGroupId].bookmarks.filter(item => item.id !== this.state.currentId);
        console.log(dataRemain, 'data remain')
        this.setState({
            visibleModalDel: false,
            data: [dataRemain, ...this.state.data]
        })
        console.log(this.state.data, 'data sau khi thay doi')
    }

    render() {
        const { data, visibleModalDel } = this.state;

        return (
            <React.Fragment>
                <div className="row">
                    {
                        data.map((item, index) => (
                            <div key={index} className="col-6">
                                <h3> {item.name} </h3>
                                {
                                    item.bookmarks.map(({ links, title, id }, indexChild) => (
                                        <React.Fragment>
                                            <Bookmark key={indexChild} title={title} links={links} showModal={() => {
                                                this.currentGroupId = index
                                                console.log(index, 'index');
                                                console.log(id, 'id');
                                                this.showModal(id)
                                            }} />
                                        </React.Fragment>
                                    ))
                                }

                            </div>
                        ))
                    }
                </div>
                <Modal
                    visible={visibleModalDel}
                    onOk={() => this.handleOk()}
                    onCancel={() => this.setState({
                        visibleModalDel: false,
                    })}
                    title="Delete Bookmark"
                >
                    <p> Bạn có chắc chắn muốn xóa bookmark ?</p>
                </Modal>
            </React.Fragment>
        );
    }
}

export default GroupBookmark;

