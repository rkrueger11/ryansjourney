import Container from './container';

export default function Footer() {
    return (
        <footer className="bg-accent-1 border-t border-accent-2">
            <Container>
                <div className="py-8 flex flex-col lg:flex-row items-center">
                    Blog site built by Ryan 💪
                </div>
            </Container>
        </footer>
    );
}
