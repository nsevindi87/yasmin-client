import React from 'react';
import { Button} from 'react-bootstrap';


const Versions = () => {
    return (
        <div>
            <h1></h1>
            <Button variant='warning' className='py-4 mb-2 text-center w-100'>App Version-1 01.08.2023</Button>

            <list>
                <ol>
                    <h3>What we have</h3>
                    <li>You can check website without login.</li>
                    <li>You can log in.</li>
                    <li>You can add word with 2 different meaning and notes.</li>
                    <li>You can delete and update your datas.</li>
                    <li>You have 3 different list. Green - yellow and red list.</li>
                    <li>You can choose which word in which list should be </li>
                    <li>With all of these lists can be made seperate practice </li>
                </ol>
            </list>

            <Button variant='warning' className='py-4 mb-2 text-center w-100'>App Version-2 ...2023</Button>
            <list>
                <ol>
                    <h3>What are we planing?</h3>
                    <li>We will add Ai tect wie OpenAI</li>
                    <li>You will add photo to be able to practice</li>
                    <li>You will decide how many quiz question shoul be come.</li>
                    <li>You will see how long does your learning take. </li>
                    <li>You will be able to change words that appears on the practice page. </li>
                </ol>
            </list>
        </div>
    )
}

export default Versions