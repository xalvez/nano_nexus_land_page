import React, { useState } from 'react';
import { useScrollAnimation, useStaggerAnimation } from '../../hooks/useScrollAnimation';
import './Contact.css';

const Contact = () => {
  const [sectionRef, isSectionVisible] = useScrollAnimation(0.1);
  const [contactRef, visibleContacts] = useStaggerAnimation(3, 0.2);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Us',
      details: 'hello@nanonexus.com',
      description: 'Send us an email anytime',
      gradient: 'contact-gradient-1'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon to Fri from 9am to 6pm',
      gradient: 'contact-gradient-2'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      details: '123 Tech Street, Silicon Valley',
      description: 'Feel free to visit our office',
      gradient: 'contact-gradient-3'
    }
  ];

  return (
    <section id="contact" className="contact section" ref={sectionRef}>
      {/* Animated Background */}
      <div className="contact-bg-elements">
        <div className="contact-orb orb-1"></div>
        <div className="contact-orb orb-2"></div>
        <div className="contact-pulse pulse-1"></div>
        <div className="contact-pulse pulse-2"></div>
      </div>

      <div className="container">
        {/* Section Header */}
        <div className="section-header-fixed">
          <h2 className="section-title-fixed">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle">
            Ready to start your project? Let's talk about your ideas!
          </p>
          <div className="section-divider"></div>
        </div>

        <div className="contact-content">
          {/* Contact Information */}
          <div className="contact-info" ref={contactRef}>
            <h3 className="shape-reveal">Contact Information</h3>
            <p className="contact-description shape-reveal">
              Get in touch with us through any of the following methods. We're here to help you bring your ideas to life.
            </p>
            
            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <div 
                  key={index}
                  className={`contact-method shape-reveal-center glow-box border-glow stagger-item ${
                    visibleContacts.includes(index) ? 'visible' : ''
                  } stagger-delay-${index + 1} ${method.gradient}`}
                >
                  <div className="method-icon">{method.icon}</div>
                  <div className="method-content">
                    <h4>{method.title}</h4>
                    <p className="method-details">{method.details}</p>
                    <p className="method-description">{method.description}</p>
                  </div>
                  <div className="method-glow"></div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className={`social-links shape-reveal ${isSectionVisible ? 'visible' : ''}`}>
              <h4>Follow Us</h4>
              <div className="social-grid">
                {['Twitter', 'LinkedIn', 'GitHub', 'Instagram'].map((social, index) => (
                  <a key={index} href="http://localhost:3000/Nano_Nexus_Landing_page" className="social-link glow-on-hover">
                    <span className="social-icon">
                      {social === 'Twitter' ? '🐦' : 
                       social === 'LinkedIn' ? '💼' : 
                       social === 'GitHub' ? '🐱' : '📷'}
                    </span>
                    <span>{social}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`contact-form-container shape-reveal ${isSectionVisible ? 'visible' : ''}`}>
            <form className="contact-form glow-box intense-glow" onSubmit={handleSubmit}>
              <h3>Send us a Message</h3>
              
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this regarding?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell us about your project or inquiry..."
                ></textarea>
              </div>

              <button type="submit" className="submit-button glow-on-hover">
                Send Message
                <span className="button-glow"></span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;