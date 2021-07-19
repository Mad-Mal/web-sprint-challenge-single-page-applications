import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router';
import './App.css';
import Review from './Review';

const initialForm = {
        name: '',
        phone: '',
        size: '',
        pepperoni: false,
        bacon: false,
        mushroom: false,
        pineapple: false,
        instrucions: ''
}

//Schema for form
const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(2, 'name must be at least 2 characters'),
    phone: yup.string().required('Phone number is required'),
    size: yup.string().required('Size selection is required'),
    pepperoni: yup.boolean(),
    bacon: yup.boolean(),
    mushroom: yup.boolean(),
    pineapple: yup.boolean(),
    instructions: yup.string(),
  })

const Form = () => {

    const history = useHistory();

    //States
    const [form, setForm] = useState({
        name: '',
        phone: '',
        size: '',
        pepperoni: false,
        bacon: false,
        mushroom: false,
        pineapple: false,
        instrucions: ''
      });

      const [errors, setErrors] = useState({
        name: '',
        phone: '',
        size: '',
        pepperoni: false,
        bacon: false,
        mushroom: false,
        pineapple: false,
        instrucions: ''
      });

      const [disabled, setDisabled] = useState(true);

      const [order, setOrder] = useState([]);

      //Error validation
      const setFormErrors = (name, value) => {
          yup.reach(schema, name)
            .validate(value)
            .then(() => setErrors({ ...errors, [name]: '' }))
            .catch(err => setErrors({ ...errors, [name]: err.errors[0] }))
      }

      //Change handler
      const change = event => {
          const { checked, value, name, type } = event.target
          const valueToUse = type === 'checkbox' ? checked : value
          setFormErrors(name, valueToUse)
          setForm({ ...form, [name]: valueToUse })
      }

      //Submit handler
      const submit = e => {
        e.preventDefault();
        const newOrder = { name: form.name, phone: form.phone, size: form.size, pepperoni: form.pepperoni, bacon: form.bacon, mushroom: form.mushroom, pineapple: form.pineapple, instructions: form.instructions }
        axios.post('https://reqres.in/api/orders', newOrder)
            .then(res => {
                debugger
                console.log(newOrder);
                setOrder([ ...order, res.data])
                setForm(initialForm);
                history.push('/review');
            })
            .catch(err => {
                console.log(err, 'Error with POST request')
            })
      }

      //Schema Verification
      useEffect(() => {
          schema.isValid(form).then(valid => setDisabled(!valid))
      }, [form])

    return (
        <div>

            <form id='pizza-form' onSubmit={submit}>
                
                <label>
                    Your Name:
                    <input name='name' value={form.name} onChange={change}/>
                </label>

                <br/>

                <label>
                    Phone Number:
                    <input name='phone' value={form.phone} onChange={change}/>
                </label>

                <br />
                
                <label>
                    Pizza Size:
                    <select id='size-dropdown' name='size' value={form.size} onChange={change}>
                        <option value='1'>Small</option>
                        <option value='2'>Medium</option>
                        <option value='3'>Large</option>
                        <option value='4'>X-Large</option>
                    </select>
                </label>
                
                <div>
                
                    <h3>Toppings</h3>
                
                    <label>
                        Pepperoni:
                        <input id='pepperoni' name='pepperoni' type='checkbox' checked={form.pepperoni} onChange={change}/>
                    </label>
                
                    <label>
                        Bacon:
                        <input id='bacon' name='bacon' type='checkbox' checked={form.bacon} onChange={change}/>
                    </label>
                
                    <label>
                        Mushroom:
                        <input id='mushroom' name='mushroom' type='checkbox' checked={form.mushroom} onChange={change}/>
                    </label>
                
                    <label>
                        Pineapple:
                        <input id='pineapple' name='pineapple' type='checkbox' checked={form.pineapple} onChange={change}/>
                    </label>

                    <br />
                
                    <label>
                        Special Instructions
                        <input id='special-text' name='instructions' type='textbox' value={form.instructions} onChange={change}/>
                    </label>

                </div>

                <button id='order-button' disabled={disabled} type='submit'>Submit Order</button>
            
            </form>

            <div style={{color: 'red' }}>
                <div>{errors.name}</div><div>{errors.phone}</div><div>{errors.size}</div>
            </div>

        </div>
    )
}

export default Form
