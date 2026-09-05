import { useState } from "react";

const contactInfo = [
    { id: 1, icon: "📧", label: "Email", value: "support@myapp.com" },
    { id: 2, icon: "📞", label: "Phone", value: "+91 98765 43210" },
    { id: 3, icon: "📍", label: "Address", value: "Sector 62, Noida, Delhi NCR" },
];

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // No backend yet — logs it and simulates success locally
        console.log("Contact form submitted:", formData);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="contact-container">
            <section className="contact-hero">
                <h1>Get in Touch</h1>
                <p>Have a question, feedback, or a partnership idea? We'd love to hear from you.</p>
            </section>

            <section className="contact-info-list">
                {contactInfo.map((info) => (
                    <div className="contact-info-card" key={info.id}>
                        <span className="contact-info-icon">{info.icon}</span>
                        <h4>{info.label}</h4>
                        <p>{info.value}</p>
                    </div>
                ))}
            </section>

            <section className="contact-form-section">
                {isSubmitted ? (
                    <div className="contact-success">
                        <span className="contact-success-icon">✅</span>
                        <h3>Thanks for reaching out!</h3>
                        <p>We've received your message and will get back to you within 24 hours.</p>
                        <button className="contact-again-btn" onClick={() => setIsSubmitted(false)}>
                            Send another message
                        </button>
                    </div>
                ) : (
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <h2>Send us a message</h2>

                        <div className="contact-form-row">
                            <div className="contact-form-field">
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="contact-form-field">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="contact-form-field">
                            <label htmlFor="subject">Subject</label>
                            <input
                                id="subject"
                                type="text"
                                placeholder="What's this about?"
                                value={formData.subject}
                                onChange={(e) => handleChange("subject", e.target.value)}
                                required
                            />
                        </div>

                        <div className="contact-form-field">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                rows="5"
                                placeholder="Tell us more..."
                                value={formData.message}
                                onChange={(e) => handleChange("message", e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="contact-submit-btn">Send Message</button>
                    </form>
                )}
            </section>
        </div>
    );
};

export default Contact;