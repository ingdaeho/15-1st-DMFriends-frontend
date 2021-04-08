import React from "react";
import { withRouter } from "react-router-dom";
import AgreementForm from "./components/AgreementForm";
import { awsAPI } from "../../config";
import "./Signup.scss";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      userInput: {
        email: "",
        password: "",
        confirm_password: "",
        username: "",
      },
      validationCode: "",
      validCode: true,
      emailAlert: true,
      pwAlert: true,
      policies: [],
    };
  }

  componentDidMount() {
    this.getPolicies();
  }

  getPolicies = () => {
    fetch(`/data/Signup.json`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ policies: res.policies });
      });
  };

  handleAllCheckedBoxes = () => {
    const { policies } = this.state;
    policies.reduce((result, policy) => (result = result && policy.checked), true)
      ? policies.map((policy) => {
          policy.checked = false;
          return policy;
        })
      : policies.map((policy) => {
          policy.checked = true;
          return policy;
        });
    this.setState({ policies });
  };

  handleCheckedBox = (index) => {
    const { policies } = this.state;
    for (let policy of policies) {
      if (policy.id === index) {
        policy.checked = !policy.checked;
      }
    }
    this.setState({ policies });
  };

  handleInputValue = (e) => {
    const { id, value } = e.target;
    this.setState({
      [id]: value,
    });
  };

  isValidEmail = (e) => {
    e.preventDefault();
    const { email } = this.state.userInput;
    const checkEmail = email.includes("@") && email.includes(".");

    this.setState({
      emailAlert: checkEmail ? true : false,
    });

    fetch(`${awsAPI}/users/sendVerifyEmail`, {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.email === "SENT") {
          alert("인증메일이 발송되었습니다. 번호를 확인해주세요.");
          this.setState({ validCode: false });
        } else {
          alert("기존에 있는 이메일 주소 입니다. 다른 이메일 주소를 입력하세요.");
        }
      });
  };

  isValidCode = (e) => {
    e.preventDefault();

    fetch(`${awsAPI}/users/verification`, {
      method: "POST",
      body: JSON.stringify({
        email: this.state.userInput,
        random_token: this.state.validationCode,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        result.code === "ACCEPT" && alert("인증번호가 확인되었습니다.");
        this.setState({ validCode: true });
      });
  };

  isValidPw = (e) => {
    e.preventDefault();
    const { password, confirm_password } = this.state.userInput;
    const checkSamePw = password === confirm_password;

    this.setState({
      pwAlert: checkSamePw ? true : false,
    });
  };

  isAllValid = (e) => {
    const { email, password, confirm_password, username } = this.state.userInput;
    e.preventDefault();

    fetch(`${awsAPI}/users/signup`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        confirm_password,
        username,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        result.message === "SUCCESS" && alert("회원가입에 성공하셨습니다.");
        this.props.history.push("/Login");
      });
  };

  render() {
    const { emailAlert, pwAlert, userInput, policies, validCode } = this.state;
    const { handleAllCheckedBoxes, isAllValid, handleCheckedBox, isValidEmail, isValidCode, handleInputValue } = this;
    const checkAllValueBtn = emailAlert && pwAlert;
    const checkedAll = policies.reduce((result, policy) => (result = result && policy.checked), true);
    return (
      <div className="Signup">
        <div className="title">동묘앞프렌즈</div>
        <div className="frame">
          <div className="frameTitle">회원가입</div>
          <form className="formEmail">
            <span>이메일주소</span>
            <input id="email" placeholder="이메일 주소 입력" onChange={handleInputValue} />
            <span className={emailAlert ? "formEmailAlert" : "activate"}>이메일 형식이 올바르지 않습니다.</span>
            {validCode ? "" : <input id="validationCode" placeholder="인증번호 입력" onChange={handleInputValue} />}
            <div>
              {validCode ? <button onClick={isValidEmail}> 인증메일 발송</button> : ""}
              {validCode ? "" : <button onClick={isValidCode}>인증번호 확인</button>}
            </div>
          </form>
          <form className="formPw">
            <span>비밀번호</span>
            <input
              id="pw"
              type="password"
              placeholder="비밀번호(8~32자리)"
              minLength="8"
              maxLength="32"
              onChange={handleInputValue}
            />
            <input
              id="rePw"
              type="password"
              placeholder="비밀번호 재입력"
              onChange={handleInputValue}
              onKeyUp={this.isValidPw}
            />
            <span className={pwAlert ? "formPwAlert" : "activate"}>비밀번호가 같지 않습니다.</span>
          </form>
          <form className="formNick">
            <span>닉네임</span>
            <span>{userInput.username.length}/20</span>
            <input
              id="nickName"
              type="text"
              placeholder="닉네임을 입력해주세요."
              maxLength="20"
              onChange={handleInputValue}
            />
          </form>
          <span className="formPolicy">약관 동의</span>
          <ul>
            <li>
              <input type="checkbox" id="checkAllBoxes" checked={checkedAll} onChange={handleAllCheckedBoxes} />
              <label htmlFor="checkAllBoxes">
                <span></span>
                전체동의
              </label>
            </li>
            <div className="formPolicyBar"></div>
            {policies.map((policy, index) => {
              return (
                <AgreementForm
                  key={index}
                  id={policy.id}
                  title={policy.title}
                  checked={policy.checked}
                  handleCheckedBox={handleCheckedBox}
                />
              );
            })}
          </ul>
          <button onClick={isAllValid} className={checkAllValueBtn ? "activateBtn" : ""}>
            다음
          </button>
        </div>
        <footer>
          <span>
            이용약관&nbsp;&nbsp;&nbsp;개인정보&nbsp;&nbsp;&nbsp;처리방침&nbsp;&nbsp;&nbsp;운영정책&nbsp;&nbsp;&nbsp;고객센터&nbsp;&nbsp;&nbsp;공지사항&nbsp;&nbsp;&nbsp;한국어
          </span>
          <div>
            <span>CopyrightⒸ</span>
            <span className="dmFriends">DongMyo Friends.</span>
            <span>All rights reserved.</span>
          </div>
        </footer>
      </div>
    );
  }
}

export default withRouter(Signup);
