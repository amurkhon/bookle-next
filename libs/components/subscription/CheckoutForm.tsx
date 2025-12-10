import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import Swal from "sweetalert2";
import { userVar } from "../../../apollo/store";
import { useMutation, useReactiveVar } from "@apollo/client";
import { UPDATE_MEMBER } from "../../../apollo/user/mutation";
import { MemberUpdate } from "../../types/member/member.update";
import { Messages } from "../../config";
import { updateStorage, updateUserInfo } from "../../auth";
import { sweetErrorHandling } from "../../sweetAlert";

export default function MembershipPayment() {
  const user = useReactiveVar(userVar);
  const router = useRouter();

  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [loading, setLoading] = useState(false);

  // form states
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCVV] = useState("");
  const [updateData, setUpdateData] = useState<MemberUpdate>({ _id: ''});

  /** APOLLO REQUESTS **/
    const [updateMember] = useMutation(UPDATE_MEMBER);

  const validateForm = () => {
    // 1. Check user login
    if (!user._id) {
      Swal.fire({
        icon: "warning",
        title: "Please log in first",
        confirmButtonColor: "#6c63ff",
      });
      return false;
    }

    // 2. Empty fields
    if (!cardHolder || !cardNumber || !expiry || !cvv) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill in all fields.",
        confirmButtonColor: "#6c63ff",
      });
      return false;
    }

    // 3. Card number validation
    const cleanNumber = cardNumber.replace(/\s/g, "");
    if (!/^\d{16}$/.test(cleanNumber)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Card Number",
        text: "Card number must be 16 digits.",
        confirmButtonColor: "#6c63ff",
      });
      return false;
    }

    // 4. Expiry validation (MM/YY)
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Expiry Date",
        text: "Use format MM/YY.",
        confirmButtonColor: "#6c63ff",
      });
      return false;
    }

    // 5. CVV validation
    if (!/^\d{3}$/.test(cvv)) {
      Swal.fire({
        icon: "error",
        title: "Invalid CVV",
        text: "CVV must be 3 digits.",
        confirmButtonColor: "#6c63ff",
      });
      return false;
    }

    return true;
  };

  const handlePay = async () => {
    if (!validateForm()) return;
    try {
      if (!user._id) throw new Error(Messages.error2);
      updateData._id = user._id;
      updateData.memberMembership = true;

      const result = await updateMember({
        variables: {
          input: updateData,
        },
      });

      // @ts-ignore
      const jwtToken = result.data.updateMember?.accessToken;
      await updateStorage({ jwtToken });
      updateUserInfo(result.data.updateMember?.accessToken);

      setLoading(true);
      setTimeout(() => {
        setLoading(false);

        Swal.fire({
          title: "🎉 Membership Activated!",
          text: "Welcome to your upgraded access!",
          icon: "success",
          confirmButtonColor: "#6c63ff",
          background: "#ffffff",
          color: "#000000",
        });

        router.push("/");
      }, 1500);
    } catch (err: any) {
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="membership-wrapper">

      {/* HERO SECTION */}
      <div className="hero-box">
        <h1>Unlock Your Full Potential</h1>
        <p>
          Choose a membership plan and access exclusive tools, analytics, and premium features.
        </p>
      </div>

      {/* MEMBERSHIP PLANS */}
      <div className="plans-container">
        {/* BASIC */}
        <div
          className={`plan-card ${selectedPlan === "basic" ? "active" : ""}`}
          onClick={() => setSelectedPlan("basic")}
        >
          <div className="badge-icon">🌱</div>
          <h3>Basic</h3>
          <p className="price">$9 / month</p>
          <ul>
            <li>✔ Access to dashboard</li>
            <li>✔ 5 project slots</li>
            <li>✔ Email support</li>
            <li className="disabled">✖ Advanced Analytics</li>
            <li className="disabled">✖ Unlimited Access</li>
          </ul>
        </div>

        {/* PRO */}
        <div
          className={`plan-card popular ${selectedPlan === "pro" ? "active" : ""}`}
          onClick={() => setSelectedPlan("pro")}
        >
          <div className="popular-tag">MOST POPULAR</div>
          <div className="badge-icon">🚀</div>
          <h3>Pro</h3>
          <p className="price">$19 / month</p>
          <ul>
            <li>✔ Everything in Basic</li>
            <li>✔ Unlimited projects</li>
            <li>✔ Advanced analytics</li>
            <li>✔ Priority support</li>
          </ul>
        </div>

        {/* ELITE */}
        <div
          className={`plan-card ${selectedPlan === "elite" ? "active" : ""}`}
          onClick={() => setSelectedPlan("elite")}
        >
          <div className="badge-icon">👑</div>
          <h3>Elite</h3>
          <p className="price">$39 / month</p>
          <ul>
            <li>✔ Everything in Pro</li>
            <li>✔ VIP mentorship</li>
            <li>✔ Early beta access</li>
            <li>✔ Lifetime archive access</li>
          </ul>
        </div>
      </div>

      {/* PAYMENT FORM */}
      <div className="payment-container">
        <h2>Secure Payment for {selectedPlan.toUpperCase()} Plan</h2>

        {!user._id ? (<p>You should log in first!</p>) : ''}

        <div className="input-box">
          <label>Card Holder</label>
          <input
            type="text"
            placeholder="Full Name"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
          />
        </div>

        <div className="input-box">
          <label>Card Number</label>
          <input
            type="text"
            placeholder="0000 0000 0000 0000"
            maxLength={19}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>

        <div className="row">
          <div className="input-box small">
            <label>Expiry</label>
            <input
              type="text"
              placeholder="MM/YY"
              maxLength={5}
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
          </div>

          <div className="input-box small">
            <label>CVV</label>
            <input
              type="password"
              placeholder="***"
              maxLength={3}
              value={cvv}
              onChange={(e) => setCVV(e.target.value)}
            />
          </div>
        </div>

        <button
          className="pay-btn"
          onClick={handlePay}
          disabled={!user._id || loading}
        >
          {loading ? "Processing..." : "Subscribe Now"}
        </button>
      </div>
    </div>
  );
}
