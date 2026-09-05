const teamMembers = [
    { id: 1, name: "Shiwali Saraswat", role: "Founder & Lead Developer", emoji: "👩‍💻" },
    { id: 2, name: "Team Member", role: "Product Design", emoji: "🎨" },
    { id: 3, name: "Team Member", role: "Operations", emoji: "🚚" },
];

const About = () => {
    return (
        <div className="about-container">
            <section className="about-hero">
                <h1>About My App</h1>
                <p>
                    We're on a mission to bring your favorite restaurants to your doorstep —
                    fast, fresh, and hassle-free.
                </p>
            </section>

            <section className="about-mission">
                <h2>Our Mission</h2>
                <p>
                    Founded with a simple idea: great food shouldn't be complicated to order.
                    We connect thousands of restaurants across Delhi NCR with people craving
                    a good meal, one tap at a time.
                </p>
            </section>

            <section className="about-features">
                <div className="about-feature-card">
                    <span className="about-feature-icon">⚡</span>
                    <h3>Fast Delivery</h3>
                    <p>Hot meals delivered in as little as 15 minutes.</p>
                </div>
                <div className="about-feature-card">
                    <span className="about-feature-icon">🍽️</span>
                    <h3>Wide Selection</h3>
                    <p>Thousands of restaurants across every cuisine you love.</p>
                </div>
                <div className="about-feature-card">
                    <span className="about-feature-icon">💛</span>
                    <h3>Customer First</h3>
                    <p>Real support, real people, whenever you need us.</p>
                </div>
            </section>

            <section className="about-team">
                <h2>Meet the Team</h2>
                <div className="about-team-list">
                    {teamMembers.map((member) => (
                        <div className="about-team-card" key={member.id}>
                            <span className="about-team-emoji">{member.emoji}</span>
                            <h4>{member.name}</h4>
                            <p>{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;