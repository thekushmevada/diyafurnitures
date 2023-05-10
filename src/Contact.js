import React, { Component } from "react";
import styled from "styled-components";

export default class SignUp extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: "",
      email: "",
      Message: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
      e.preventDefault();
        const {username, email, Message } =
          this.state;
        // console.log(username, email, Message);
        fetch("https://productssapi.onrender.com/inquiry", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            username,
            email,
            Message,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            //console.log(data, "userRegister");
            if (data.status === "ok") {
              alert("Your Query has been registered successful");
              window.location.href = "./contact";
            }
          });
  }

  render() {
    return (
      <Wrapper>
        <h2 className="common-heading">Contact Page</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3647.2395090557357!2d72.35647721490781!3d23.916571484507728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395cf50bcadaf9f7%3A0xea4cdf11a6e3fd0d!2sDiya%20Furnitures!5e0!3m2!1sen!2sin!4v1677419496934!5m2!1sen!2sin"
          width="70%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="MAP"
        ></iframe>

        <div className="container">
          <div className="contact-form">
            <form
              onSubmit={this.handleSubmit}
              method="POST"
              className="contact-inputs"
            >
              <input
                type="text"
                placeholder="username"
                name="username"
                required
                autoComplete="off"
                // value=""
                onChange={(e) => this.setState({ username: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                name="Email"
                required
                autoComplete="off"
                // value=""
                onChange={(e) => this.setState({ email: e.target.value })}
              />
              <textarea
                name="Message"
                cols="30"
                rows="10"
                required
                autoComplete="off"
                placeholder="Enter Your Message"
                onChange={(e) => this.setState({ Message: e.target.value })}
              ></textarea>
              <input type="submit" value="send" />
            </form>
          </div>
        </div>
      </Wrapper>
    );
  }
}

// export default Contact;

const Wrapper = styled.section`
  padding: 9rem 0 5rem 0;
  text-align: center;

  .container {
    margin-top: 6rem;

    .contact-form {
      max-width: 50rem;
      margin: auto;

      .contact-inputs {
        display: flex;
        flex-direction: column;
        gap: 3rem;

        input[type="submit"] {
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background-color: ${({ theme }) => theme.colors.white};
            border: 1px solid ${({ theme }) => theme.colors.btn};
            color: ${({ theme }) => theme.colors.btn};
            transform: scale(0.9);
          }
        }
      }
    }
  }
`;
