// Subscriptions.js
import React, { useState } from 'react';
import './Subscriptions.css'; // Make sure to include CSS for styling

const SubscriptionStatus = () => {
  return (
    <div className="subscription-status">
      <h2>Subscription Status</h2>
      <p><strong>Plan:</strong> Premium</p>
      <p><strong>Status:</strong> Active</p>
      <p><strong>Renewal Date:</strong> October 15, 2024</p>
      <p><strong>Billing Amount:</strong> $9.99/month</p>
    </div>
  );
};

const ManageSubscription = () => {
  // Function to handle button clicks
  const handleUpgrade = () => {
    alert('Upgrade functionality not implemented yet.');
  };

  const handleDowngrade = () => {
    alert('Downgrade functionality not implemented yet.');
  };

  const handleCancel = () => {
    alert('Cancel functionality not implemented yet.');
  };

  const handleUpdatePayment = () => {
    alert('Update payment information functionality not implemented yet.');
  };

  return (
    <div className="manage-subscription">
      <h2>Manage Your Subscription</h2>
      <button onClick={handleUpgrade}>Upgrade to Premium</button>
      <button onClick={handleDowngrade}>Downgrade to Basic</button>
      <button onClick={handleCancel}>Cancel Subscription</button>
      <button onClick={handleUpdatePayment}>Update Payment Information</button>
    </div>
  );
};

const BillingHistory = () => {
  return (
    <div className="billing-history">
      <h2>Billing History</h2>
      <ul>
        <li>Invoice #12345 - $9.99 - January 15, 2024</li>
        <li>Invoice #12346 - $9.99 - February 15, 2024</li>
        {/* Add more items as needed */}
      </ul>
    </div>
  );
};

const SubscriptionBenefits = () => {
  return (
    <div className="subscription-benefits">
      <h2>Subscription Benefits</h2>
      <ul>
        <li>Access to exclusive content</li>
        <li>No ads</li>
        <li>Priority customer support</li>
      </ul>
    </div>
  );
};

const ContactSupport = () => {
  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Support request submitted.');
  };

  return (
    <div className="contact-support">
      <h2>Contact Support</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="issue">Describe your issue:</label>
        <textarea id="issue" rows="4"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const AccountSettings = () => {
  const handleChangePassword = () => {
    alert('Change password functionality not implemented yet.');
  };

  const handleManageEmailPreferences = () => {
    alert('Manage email preferences functionality not implemented yet.');
  };

  return (
    <div className="account-settings">
      <h2>Account Settings</h2>
      <button onClick={handleChangePassword}>Change Password</button>
      <button onClick={handleManageEmailPreferences}>Manage Email Preferences</button>
    </div>
  );
};

const UserInstructions = () => {
  return (
    <div className="user-instructions">
      <h2>How to Manage Your Subscription</h2>
      <p>1. Click on 'Upgrade' to switch to a higher plan.</p>
      <p>2. Click on 'Downgrade' to switch to a lower plan.</p>
      <p>3. Use the 'Cancel' button to end your subscription.</p>
      <p>4. Update your payment information by clicking on 'Update Payment Information'.</p>
    </div>
  );
};

const Subscriptions = () => {
  return (
    <div className="subscriptions-page">
      <SubscriptionStatus />
      <ManageSubscription />
      <BillingHistory />
      <SubscriptionBenefits />
      <ContactSupport />
      <AccountSettings />
      <UserInstructions />
    </div>
  );
};

export default Subscriptions;
