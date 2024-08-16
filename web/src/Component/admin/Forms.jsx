import React, { useState } from 'react';
import './Forms.css'

const Forms = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const apiURL = "http://localhost:8001";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);
        formData.append('category', category);

        try {
            const response = await fetch(`${apiURL}/addproduct`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setMessage('Added successfully');
                setName('');
                setDescription('');
                setPrice('');
                setCategory('');
                setImage(null);
            } else {
                const errData = await response.json();
                setError(`Unable to add product: ${errData.message}`);
            }
        } catch (err) {
            setError(`Error: ${err.message}`);
        }
    };

    return (
        <div className='container-fluid'>
            <div className='container-card'>
                <form onSubmit={handleSubmit}>
                    <div className='container-card-body'>
                        <div className='form-group'>
                            <input
                                type='text'
                                className="form-control"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}

                            />
                        </div>
                        <div className='form-group'>
                            <textarea
                                className="form-control"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='number'
                                className="form-control"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}

                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='text'
                                className="form-control"
                                placeholder="Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}

                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='file'
                                className='form-control'
                                onChange={(e) => setImage(e.target.files[0])}

                            />
                        </div>
                     
                        <button className='btn btn-success' type='submit'>Submit</button>
                        {message && <p className='text-success'>{message}</p>}
                        {error && <p className='text-danger'>{error}</p>}
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Forms;
