-- Insert sample users
INSERT INTO users (id, name, email, password, role, "createdAt") VALUES
('user1', 'John Doe', 'john@example.com', '$2a$10$examplehash', 'user', NOW()),
('officer1', 'Jane Officer', 'jane@example.com', '$2a$10$examplehash', 'officer', NOW());

-- Insert sample reports
INSERT INTO reports (id, title, description, type, "imageUrl", latitude, longitude, status, "userId", "createdAt") VALUES
('report1', 'Illegal dumping in Nairobi', 'Dumping near river', 'dumping', NULL, -1.2864, 36.8172, 'pending', 'user1', NOW());

-- Insert sample heritage sites
INSERT INTO heritage_sites (id, name, description, location, "culturalSignificance") VALUES
('site1', 'Maasai Cultural Site', 'Traditional Maasai lands', 'Kajiado', 'Cultural heritage of Maasai people');

-- Insert sample indigenous practices
INSERT INTO indigenous_practices (id, title, description, region) VALUES
('practice1', 'Sustainable Farming', 'Traditional farming methods', 'Rift Valley');

-- Insert sample climate events
INSERT INTO climate_events (id, type, location, date, impact) VALUES
('event1', 'Drought', 'Turkana', '2024-01-01', 'Severe drought affecting livestock');