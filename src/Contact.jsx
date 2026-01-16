import { useState,useEffect } from 'react';
import './Contact.css';

function Contact() {
    return (

        <>
          <form action="https://formsubmit.co/nikokurs2016@gmail.com" method="POST" className="form">
            <h2>Kontaktiraj nas</h2>
            <p type="Name:"><input type="text" name="name" required /></p>
            <p type="Email:"><input type="email" name="email" required /></p>
            <p type="Message:"><textarea name="message" required></textarea></p>
            <button type="submit">Submit Form</button>
            <div>
              <span className="fa fa-phone"></span>+381 60-1234567
              <span className="fa-solid fa-envelope"></span>inffoo@gmail.com
            </div>
            <input type="hidden" name="access_key" value="40f615ea-1d8c-47e2-ae79-367ef2950e09" />
          </form>
        </>

    );
}

export default Contact;
