import React, { Component } from 'react';
import axios from 'axios';
import Bookmark from './bookmark.component';

import { Modal } from 'antd';

class GroupBookmark extends Component {
    constructor(props) {
        super();

        this.state = {
            data: [],
            visibleModalDel: false
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
            visibleModalDel: true
        })
    }

    handleOk = (id) => {
        this.setState({
            visibleModalDel: false
        })


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
                                    item.bookmarks.map(({ links, title, id }) => (
                                        <React.Fragment>
                                            <Bookmark title={title} links={links} showModal={() => {
                                                this.showModal()
                                            }} />
                                        </React.Fragment>
                                    ))
                                }
                                <Modal
                                    visible={visibleModalDel}
                                    onOk={() => this.handleOk()}
                                    title="Delete Bookmark"
                                >
                                    <p> Bạn có chắc chắn muốn xóa bookmark ?</p>
                                </Modal>
                            </div>
                        ))
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default GroupBookmark;

