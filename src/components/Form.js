import React from 'react';

class Form extends React.Component {
    render() {
        return (
            <div className='form'>
                <form onSubmit={this.props.handleSubmit}>
                    <h2 className="text-center">CREATE NEW USER</h2>
                    <div className="form-group">
                        <input type="text" className="form-control" id="name" placeholder="enter username" value={this.props.name} onChange={this.props.handleChange} required />
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" id="gender" placeholder="enter gender" value={this.props.gender} onChange={this.props.handleChange} required />
                    </div>

                    <div className="form-group">
                        <input type="number" className="form-control" id="age" placeholder="your age" value={this.props.age} onChange={this.props.handleChange} required />
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" id="occupation" placeholder="enter occupation" value={this.props.occupation} onChange={this.props.handleChange} required />
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" id="location" placeholder="enter location" value={this.props.location} onChange={this.props.handleChange} required />
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" id="image" placeholder="enter image url" value={this.props.image} onChange={this.props.handleChange} required />
                    </div>

                    <input type="submit" className="btn btn-success form-control" value="SUBMIT" />
                </form>

                <div className="title">
                    <h2>FIND YOUR LOVE</h2>
                </div>
            </div>

        )
    }
}



export default Form