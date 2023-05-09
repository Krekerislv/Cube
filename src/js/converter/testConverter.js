const fs = require('fs');

const hexArray = [
    0x00, 0x01, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0x01, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x0C, 0x02, 0x00, 0x00, 0x00, 0x3E, 0x33,
    0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2C, 0x20, 0x56, 0x65, 0x72, 0x73,
    0x69, 0x6F, 0x6E, 0x3D, 0x32, 0x2E, 0x30, 0x2E, 0x30, 0x2E, 0x30, 0x2C,
    0x20, 0x43, 0x75, 0x6C, 0x74, 0x75, 0x72, 0x65, 0x3D, 0x6E, 0x65, 0x75,
    0x74, 0x72, 0x61, 0x6C, 0x2C, 0x20, 0x50, 0x75, 0x62, 0x6C, 0x69, 0x63,
    0x4B, 0x65, 0x79, 0x54, 0x6F, 0x6B, 0x65, 0x6E, 0x3D, 0x6E, 0x75, 0x6C,
    0x6C, 0x05, 0x01, 0x00, 0x00, 0x00, 0x15, 0x5F, 0x33, 0x44, 0x5F, 0x47,
    0x75, 0x61, 0x6E, 0x2E, 0x53, 0x61, 0x76, 0x65, 0x5F, 0x56, 0x65, 0x72,
    0x73, 0x69, 0x6F, 0x6E, 0x03, 0x00, 0x00, 0x00, 0x07, 0x76, 0x65, 0x72,
    0x73, 0x69, 0x6F, 0x6E, 0x04, 0x74, 0x79, 0x70, 0x65, 0x04, 0x64, 0x61,
    0x74, 0x65, 0x01, 0x01, 0x01, 0x02, 0x00, 0x00, 0x00, 0x06, 0x03, 0x00,
    0x00, 0x00, 0x04, 0x31, 0x2E, 0x30, 0x32, 0x06, 0x04, 0x00, 0x00, 0x00,
    0x0A, 0x33, 0x44, 0x5F, 0x47, 0x65, 0x6E, 0x65, 0x72, 0x61, 0x6C, 0x06,
    0x05, 0x00, 0x00, 0x00, 0x13, 0x30, 0x39, 0x2E, 0x30, 0x35, 0x2E, 0x32,
    0x30, 0x32, 0x33, 0x20, 0x30, 0x30, 0x3A, 0x30, 0x30, 0x3A, 0x30, 0x30,
    0x0B, 0x00, 0x01, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0x01, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0C, 0x02, 0x00, 0x00, 0x00, 0x3E,
    0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2C, 0x20, 0x56, 0x65, 0x72,
    0x73, 0x69, 0x6F, 0x6E, 0x3D, 0x32, 0x2E, 0x30, 0x2E, 0x30, 0x2E, 0x30,
    0x2C, 0x20, 0x43, 0x75, 0x6C, 0x74, 0x75, 0x72, 0x65, 0x3D, 0x6E, 0x65,
    0x75, 0x74, 0x72, 0x61, 0x6C, 0x2C, 0x20, 0x50, 0x75, 0x62, 0x6C, 0x69,
    0x63, 0x4B, 0x65, 0x79, 0x54, 0x6F, 0x6B, 0x65, 0x6E, 0x3D, 0x6E, 0x75,
    0x6C, 0x6C, 0x05, 0x01, 0x00, 0x00, 0x00, 0x16, 0x5F, 0x33, 0x44, 0x5F,
    0x47, 0x75, 0x61, 0x6E, 0x2E, 0x43, 0x61, 0x72, 0x74, 0x6F, 0x6F, 0x6E,
    0x43, 0x6F, 0x6E, 0x66, 0x69, 0x67, 0x04, 0x00, 0x00, 0x00, 0x06, 0x6D,
    0x5F, 0x6B, 0x65, 0x79, 0x31, 0x06, 0x6D, 0x5F, 0x6B, 0x65, 0x79, 0x32,
    0x06, 0x6D, 0x5F, 0x6B, 0x65, 0x79, 0x33, 0x0D, 0x6D, 0x5F, 0x64, 0x69,
    0x73, 0x70, 0x6C, 0x61, 0x79, 0x4C, 0x69, 0x73, 0x74, 0x00, 0x00, 0x00,
    0x03, 0x08, 0x08, 0x08, 0x78, 0x53, 0x79, 0x73, 0x74, 0x65, 0x6D, 0x2E,
    0x43, 0x6F, 0x6C, 0x6C, 0x65, 0x63, 0x74, 0x69, 0x6F, 0x6E, 0x73, 0x2E,
    0x47, 0x65, 0x6E, 0x65, 0x72, 0x69, 0x63, 0x2E, 0x4C, 0x69, 0x73, 0x74,
    0x60, 0x31, 0x5B, 0x5B, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E,
    0x2E, 0x44, 0x65, 0x62, 0x75, 0x67, 0x53, 0x6F, 0x6C, 0x69, 0x64, 0x2C,
    0x20, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2C, 0x20, 0x56, 0x65,
    0x72, 0x73, 0x69, 0x6F, 0x6E, 0x3D, 0x32, 0x2E, 0x30, 0x2E, 0x30, 0x2E,
    0x30, 0x2C, 0x20, 0x43, 0x75, 0x6C, 0x74, 0x75, 0x72, 0x65, 0x3D, 0x6E,
    0x65, 0x75, 0x74, 0x72, 0x61, 0x6C, 0x2C, 0x20, 0x50, 0x75, 0x62, 0x6C,
    0x69, 0x63, 0x4B, 0x65, 0x79, 0x54, 0x6F, 0x6B, 0x65, 0x6E, 0x3D, 0x6E,
    0x75, 0x6C, 0x6C, 0x5D, 0x5D, 0x02, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00,
    0x00, 0x03, 0x00, 0x00, 0x00, 0x04, 0x00, 0x00, 0x00, 0x09, 0x03, 0x00,
    0x00, 0x00, 0x04, 0x03, 0x00, 0x00, 0x00, 0x78, 0x53, 0x79, 0x73, 0x74,
    0x65, 0x6D, 0x2E, 0x43, 0x6F, 0x6C, 0x6C, 0x65, 0x63, 0x74, 0x69, 0x6F,
    0x6E, 0x73, 0x2E, 0x47, 0x65, 0x6E, 0x65, 0x72, 0x69, 0x63, 0x2E, 0x4C,
    0x69, 0x73, 0x74, 0x60, 0x31, 0x5B, 0x5B, 0x5F, 0x33, 0x44, 0x5F, 0x47,
    0x75, 0x61, 0x6E, 0x2E, 0x44, 0x65, 0x62, 0x75, 0x67, 0x53, 0x6F, 0x6C,
    0x69, 0x64, 0x2C, 0x20, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2C,
    0x20, 0x56, 0x65, 0x72, 0x73, 0x69, 0x6F, 0x6E, 0x3D, 0x32, 0x2E, 0x30,
    0x2E, 0x30, 0x2E, 0x30, 0x2C, 0x20, 0x43, 0x75, 0x6C, 0x74, 0x75, 0x72,
    0x65, 0x3D, 0x6E, 0x65, 0x75, 0x74, 0x72, 0x61, 0x6C, 0x2C, 0x20, 0x50,
    0x75, 0x62, 0x6C, 0x69, 0x63, 0x4B, 0x65, 0x79, 0x54, 0x6F, 0x6B, 0x65,
    0x6E, 0x3D, 0x6E, 0x75, 0x6C, 0x6C, 0x5D, 0x5D, 0x03, 0x00, 0x00, 0x00,
    0x06, 0x5F, 0x69, 0x74, 0x65, 0x6D, 0x73, 0x05, 0x5F, 0x73, 0x69, 0x7A,
    0x65, 0x08, 0x5F, 0x76, 0x65, 0x72, 0x73, 0x69, 0x6F, 0x6E, 0x04, 0x00,
    0x00, 0x15, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E, 0x44,
    0x65, 0x62, 0x75, 0x67, 0x53, 0x6F, 0x6C, 0x69, 0x64, 0x5B, 0x5D, 0x02,
    0x00, 0x00, 0x00, 0x08, 0x08, 0x09, 0x04, 0x00, 0x00, 0x00, 0x01, 0x00,
    0x00, 0x00, 0x07, 0x00, 0x00, 0x00, 0x07, 0x04, 0x00, 0x00, 0x00, 0x00,
    0x01, 0x00, 0x00, 0x00, 0x04, 0x00, 0x00, 0x00, 0x04, 0x13, 0x5F, 0x33,
    0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E, 0x44, 0x65, 0x62, 0x75, 0x67,
    0x53, 0x6F, 0x6C, 0x69, 0x64, 0x02, 0x00, 0x00, 0x00, 0x09, 0x05, 0x00,
    0x00, 0x00, 0x0D, 0x03, 0x05, 0x05, 0x00, 0x00, 0x00, 0x13, 0x5F, 0x33,
    0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E, 0x44, 0x65, 0x62, 0x75, 0x67,
    0x53, 0x6F, 0x6C, 0x69, 0x64, 0x07, 0x00, 0x00, 0x00, 0x01, 0x58, 0x01,
    0x59, 0x01, 0x5A, 0x04, 0x4C, 0x6F, 0x6E, 0x67, 0x05, 0x57, 0x69, 0x64,
    0x74, 0x68, 0x06, 0x48, 0x65, 0x69, 0x67, 0x68, 0x74, 0x03, 0x44, 0x69,
    0x72, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x08, 0x08, 0x08, 0x08,
    0x08, 0x08, 0x1B, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E,
    0x44, 0x65, 0x62, 0x75, 0x67, 0x53, 0x6F, 0x6C, 0x69, 0x64, 0x2B, 0x43,
    0x75, 0x62, 0x65, 0x44, 0x69, 0x72, 0x02, 0x00, 0x00, 0x00, 0x02, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x08, 0x00, 0x00, 0x00, 0x08, 0x00, 0x00, 0x00, 0x08, 0x00,
    0x00, 0x00, 0x05, 0xFA, 0xFF, 0xFF, 0xFF, 0x1B, 0x5F, 0x33, 0x44, 0x5F,
    0x47, 0x75, 0x61, 0x6E, 0x2E, 0x44, 0x65, 0x62, 0x75, 0x67, 0x53, 0x6F,
    0x6C, 0x69, 0x64, 0x2B, 0x43, 0x75, 0x62, 0x65, 0x44, 0x69, 0x72, 0x01,
    0x00, 0x00, 0x00, 0x07, 0x76, 0x61, 0x6C, 0x75, 0x65, 0x5F, 0x5F, 0x00,
    0x08, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0B, 0x00, 0x01,
    0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0x01, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x0C, 0x02, 0x00, 0x00, 0x00, 0x3E, 0x33, 0x44, 0x5F,
    0x47, 0x75, 0x61, 0x6E, 0x2C, 0x20, 0x56, 0x65, 0x72, 0x73, 0x69, 0x6F,
    0x6E, 0x3D, 0x32, 0x2E, 0x30, 0x2E, 0x30, 0x2E, 0x30, 0x2C, 0x20, 0x43,
    0x75, 0x6C, 0x74, 0x75, 0x72, 0x65, 0x3D, 0x6E, 0x65, 0x75, 0x74, 0x72,
    0x61, 0x6C, 0x2C, 0x20, 0x50, 0x75, 0x62, 0x6C, 0x69, 0x63, 0x4B, 0x65,
    0x79, 0x54, 0x6F, 0x6B, 0x65, 0x6E, 0x3D, 0x6E, 0x75, 0x6C, 0x6C, 0x05,
    0x01, 0x00, 0x00, 0x00, 0x6D, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61,
    0x6E, 0x2E, 0x53, 0x6F, 0x75, 0x72, 0x63, 0x65, 0x4C, 0x69, 0x73, 0x74,
    0x60, 0x31, 0x5B, 0x5B, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E,
    0x2E, 0x50, 0x61, 0x6C, 0x65, 0x74, 0x74, 0x65, 0x44, 0x61, 0x74, 0x61,
    0x2C, 0x20, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2C, 0x20, 0x56,
    0x65, 0x72, 0x73, 0x69, 0x6F, 0x6E, 0x3D, 0x32, 0x2E, 0x30, 0x2E, 0x30,
    0x2E, 0x30, 0x2C, 0x20, 0x43, 0x75, 0x6C, 0x74, 0x75, 0x72, 0x65, 0x3D,
    0x6E, 0x65, 0x75, 0x74, 0x72, 0x61, 0x6C, 0x2C, 0x20, 0x50, 0x75, 0x62,
    0x6C, 0x69, 0x63, 0x4B, 0x65, 0x79, 0x54, 0x6F, 0x6B, 0x65, 0x6E, 0x3D,
    0x6E, 0x75, 0x6C, 0x6C, 0x5D, 0x5D, 0x01, 0x00, 0x00, 0x00, 0x06, 0x6D,
    0x5F, 0x6C, 0x69, 0x73, 0x74, 0x03, 0x79, 0x53, 0x79, 0x73, 0x74, 0x65,
    0x6D, 0x2E, 0x43, 0x6F, 0x6C, 0x6C, 0x65, 0x63, 0x74, 0x69, 0x6F, 0x6E,
    0x73, 0x2E, 0x47, 0x65, 0x6E, 0x65, 0x72, 0x69, 0x63, 0x2E, 0x4C, 0x69,
    0x73, 0x74, 0x60, 0x31, 0x5B, 0x5B, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75,
    0x61, 0x6E, 0x2E, 0x50, 0x61, 0x6C, 0x65, 0x74, 0x74, 0x65, 0x44, 0x61,
    0x74, 0x61, 0x2C, 0x20, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2C,
    0x20, 0x56, 0x65, 0x72, 0x73, 0x69, 0x6F, 0x6E, 0x3D, 0x32, 0x2E, 0x30,
    0x2E, 0x30, 0x2E, 0x30, 0x2C, 0x20, 0x43, 0x75, 0x6C, 0x74, 0x75, 0x72,
    0x65, 0x3D, 0x6E, 0x65, 0x75, 0x74, 0x72, 0x61, 0x6C, 0x2C, 0x20, 0x50,
    0x75, 0x62, 0x6C, 0x69, 0x63, 0x4B, 0x65, 0x79, 0x54, 0x6F, 0x6B, 0x65,
    0x6E, 0x3D, 0x6E, 0x75, 0x6C, 0x6C, 0x5D, 0x5D, 0x02, 0x00, 0x00, 0x00,
    0x09, 0x03, 0x00, 0x00, 0x00, 0x04, 0x03, 0x00, 0x00, 0x00, 0x79, 0x53,
    0x79, 0x73, 0x74, 0x65, 0x6D, 0x2E, 0x43, 0x6F, 0x6C, 0x6C, 0x65, 0x63,
    0x74, 0x69, 0x6F, 0x6E, 0x73, 0x2E, 0x47, 0x65, 0x6E, 0x65, 0x72, 0x69,
    0x63, 0x2E, 0x4C, 0x69, 0x73, 0x74, 0x60, 0x31, 0x5B, 0x5B, 0x5F, 0x33,
    0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E, 0x50, 0x61, 0x6C, 0x65, 0x74,
    0x74, 0x65, 0x44, 0x61, 0x74, 0x61, 0x2C, 0x20, 0x33, 0x44, 0x5F, 0x47,
    0x75, 0x61, 0x6E, 0x2C, 0x20, 0x56, 0x65, 0x72, 0x73, 0x69, 0x6F, 0x6E,
    0x3D, 0x32, 0x2E, 0x30, 0x2E, 0x30, 0x2E, 0x30, 0x2C, 0x20, 0x43, 0x75,
    0x6C, 0x74, 0x75, 0x72, 0x65, 0x3D, 0x6E, 0x65, 0x75, 0x74, 0x72, 0x61,
    0x6C, 0x2C, 0x20, 0x50, 0x75, 0x62, 0x6C, 0x69, 0x63, 0x4B, 0x65, 0x79,
    0x54, 0x6F, 0x6B, 0x65, 0x6E, 0x3D, 0x6E, 0x75, 0x6C, 0x6C, 0x5D, 0x5D,
    0x03, 0x00, 0x00, 0x00, 0x06, 0x5F, 0x69, 0x74, 0x65, 0x6D, 0x73, 0x05,
    0x5F, 0x73, 0x69, 0x7A, 0x65, 0x08, 0x5F, 0x76, 0x65, 0x72, 0x73, 0x69,
    0x6F, 0x6E, 0x04, 0x00, 0x00, 0x16, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75,
    0x61, 0x6E, 0x2E, 0x50, 0x61, 0x6C, 0x65, 0x74, 0x74, 0x65, 0x44, 0x61,
    0x74, 0x61, 0x5B, 0x5D, 0x02, 0x00, 0x00, 0x00, 0x08, 0x08, 0x09, 0x04,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1C, 0x00, 0x00, 0x00, 0x07,
    0x04, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x10, 0x00, 0x00,
    0x00, 0x04, 0x14, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E,
    0x50, 0x61, 0x6C, 0x65, 0x74, 0x74, 0x65, 0x44, 0x61, 0x74, 0x61, 0x02,
    0x00, 0x00, 0x00, 0x0D, 0x10, 0x0B, 0x00, 0x01, 0x00, 0x00, 0x00, 0xFF,
    0xFF, 0xFF, 0xFF, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0C,
    0x02, 0x00, 0x00, 0x00, 0x3E, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E,
    0x2C, 0x20, 0x56, 0x65, 0x72, 0x73, 0x69, 0x6F, 0x6E, 0x3D, 0x32, 0x2E,
    0x30, 0x2E, 0x30, 0x2E, 0x30, 0x2C, 0x20, 0x43, 0x75, 0x6C, 0x74, 0x75,
    0x72, 0x65, 0x3D, 0x6E, 0x65, 0x75, 0x74, 0x72, 0x61, 0x6C, 0x2C, 0x20,
    0x50, 0x75, 0x62, 0x6C, 0x69, 0x63, 0x4B, 0x65, 0x79, 0x54, 0x6F, 0x6B,
    0x65, 0x6E, 0x3D, 0x6E, 0x75, 0x6C, 0x6C, 0x05, 0x01, 0x00, 0x00, 0x00,
    0x6B, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E, 0x53, 0x6F,
    0x75, 0x72, 0x63, 0x65, 0x4C, 0x69, 0x73, 0x74, 0x60, 0x31, 0x5B, 0x5B,
    0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E, 0x47, 0x72, 0x61,
    0x70, 0x68, 0x44, 0x61, 0x74, 0x61, 0x2C, 0x20, 0x33, 0x44, 0x5F, 0x47,
    0x75, 0x61, 0x6E, 0x2C, 0x20, 0x56, 0x65, 0x72, 0x73, 0x69, 0x6F, 0x6E,
    0x3D, 0x32, 0x2E, 0x30, 0x2E, 0x30, 0x2E, 0x30, 0x2C, 0x20, 0x43, 0x75,
    0x6C, 0x74, 0x75, 0x72, 0x65, 0x3D, 0x6E, 0x65, 0x75, 0x74, 0x72, 0x61,
    0x6C, 0x2C, 0x20, 0x50, 0x75, 0x62, 0x6C, 0x69, 0x63, 0x4B, 0x65, 0x79,
    0x54, 0x6F, 0x6B, 0x65, 0x6E, 0x3D, 0x6E, 0x75, 0x6C, 0x6C, 0x5D, 0x5D,
    0x01, 0x00, 0x00, 0x00, 0x06, 0x6D, 0x5F, 0x6C, 0x69, 0x73, 0x74, 0x03,
    0x77, 0x53, 0x79, 0x73, 0x74, 0x65, 0x6D, 0x2E, 0x43, 0x6F, 0x6C, 0x6C,
    0x65, 0x63, 0x74, 0x69, 0x6F, 0x6E, 0x73, 0x2E, 0x47, 0x65, 0x6E, 0x65,
    0x72, 0x69, 0x63, 0x2E, 0x4C, 0x69, 0x73, 0x74, 0x60, 0x31, 0x5B, 0x5B,
    0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E, 0x47, 0x72, 0x61,
    0x70, 0x68, 0x44, 0x61, 0x74, 0x61, 0x2C, 0x20, 0x33, 0x44, 0x5F, 0x47,
    0x75, 0x61, 0x6E, 0x2C, 0x20, 0x56, 0x65, 0x72, 0x73, 0x69, 0x6F, 0x6E,
    0x3D, 0x32, 0x2E, 0x30, 0x2E, 0x30, 0x2E, 0x30, 0x2C, 0x20, 0x43, 0x75,
    0x6C, 0x74, 0x75, 0x72, 0x65, 0x3D, 0x6E, 0x65, 0x75, 0x74, 0x72, 0x61,
    0x6C, 0x2C, 0x20, 0x50, 0x75, 0x62, 0x6C, 0x69, 0x63, 0x4B, 0x65, 0x79,
    0x54, 0x6F, 0x6B, 0x65, 0x6E, 0x3D, 0x6E, 0x75, 0x6C, 0x6C, 0x5D, 0x5D,
    0x02, 0x00, 0x00, 0x00, 0x09, 0x03, 0x00, 0x00, 0x00, 0x04, 0x03, 0x00,
    0x00, 0x00, 0x77, 0x53, 0x79, 0x73, 0x74, 0x65, 0x6D, 0x2E, 0x43, 0x6F,
    0x6C, 0x6C, 0x65, 0x63, 0x74, 0x69, 0x6F, 0x6E, 0x73, 0x2E, 0x47, 0x65,
    0x6E, 0x65, 0x72, 0x69, 0x63, 0x2E, 0x4C, 0x69, 0x73, 0x74, 0x60, 0x31,
    0x5B, 0x5B, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E, 0x47,
    0x72, 0x61, 0x70, 0x68, 0x44, 0x61, 0x74, 0x61, 0x2C, 0x20, 0x33, 0x44,
    0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2C, 0x20, 0x56, 0x65, 0x72, 0x73, 0x69,
    0x6F, 0x6E, 0x3D, 0x32, 0x2E, 0x30, 0x2E, 0x30, 0x2E, 0x30, 0x2C, 0x20,
    0x43, 0x75, 0x6C, 0x74, 0x75, 0x72, 0x65, 0x3D, 0x6E, 0x65, 0x75, 0x74,
    0x72, 0x61, 0x6C, 0x2C, 0x20, 0x50, 0x75, 0x62, 0x6C, 0x69, 0x63, 0x4B,
    0x65, 0x79, 0x54, 0x6F, 0x6B, 0x65, 0x6E, 0x3D, 0x6E, 0x75, 0x6C, 0x6C,
    0x5D, 0x5D, 0x03, 0x00, 0x00, 0x00, 0x06, 0x5F, 0x69, 0x74, 0x65, 0x6D,
    0x73, 0x05, 0x5F, 0x73, 0x69, 0x7A, 0x65, 0x08, 0x5F, 0x76, 0x65, 0x72,
    0x73, 0x69, 0x6F, 0x6E, 0x04, 0x00, 0x00, 0x14, 0x5F, 0x33, 0x44, 0x5F,
    0x47, 0x75, 0x61, 0x6E, 0x2E, 0x47, 0x72, 0x61, 0x70, 0x68, 0x44, 0x61,
    0x74, 0x61, 0x5B, 0x5D, 0x02, 0x00, 0x00, 0x00, 0x08, 0x08, 0x09, 0x04,
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0xEF, 0x00, 0x00, 0x00, 0x07,
    0x04, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x80, 0x00, 0x00,
    0x00, 0x04, 0x12, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E,
    0x47, 0x72, 0x61, 0x70, 0x68, 0x44, 0x61, 0x74, 0x61, 0x02, 0x00, 0x00,
    0x00, 0x09, 0x05, 0x00, 0x00, 0x00, 0x0D, 0x7F, 0x05, 0x05, 0x00, 0x00,
    0x00, 0x12, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E, 0x47,
    0x72, 0x61, 0x70, 0x68, 0x44, 0x61, 0x74, 0x61, 0x06, 0x00, 0x00, 0x00,
    0x06, 0x6D, 0x5F, 0x6C, 0x6F, 0x6E, 0x67, 0x07, 0x6D, 0x5F, 0x77, 0x69,
    0x64, 0x74, 0x68, 0x08, 0x6D, 0x5F, 0x68, 0x65, 0x69, 0x67, 0x68, 0x74,
    0x06, 0x6D, 0x5F, 0x62, 0x75, 0x66, 0x66, 0x06, 0x6D, 0x5F, 0x6E, 0x61,
    0x6D, 0x65, 0x0F, 0x4D, 0x79, 0x4F, 0x62, 0x6A, 0x65, 0x63, 0x74, 0x2B,
    0x6D, 0x5F, 0x6E, 0x61, 0x6D, 0x65, 0x00, 0x00, 0x00, 0x07, 0x01, 0x01,
    0x08, 0x08, 0x08, 0x02, 0x02, 0x00, 0x00, 0x00, 0x08, 0x00, 0x00, 0x00,
    0x08, 0x00, 0x00, 0x00, 0x08, 0x00, 0x00, 0x00, 0x09, 0x06, 0x00, 0x00,
    0x00, 0x06, 0x07, 0x00, 0x00, 0x00, 0x05, 0x38, 0x78, 0x38, 0x78, 0x38,
    0x09, 0x07, 0x00, 0x00, 0x00, 0x0F, 0x06, 0x00, 0x00, 0x00, 0x00, 0x02,
    0x00, 0x00, 0x02, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x05, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x05,
    0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00,
    0x06, 0x06, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x06, 0x06, 0x00, 0x00,
    0x05, 0x00, 0x00, 0x00, 0x00, 0x06, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x05, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x06, 0x06, 0x00, 0x05,
    0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x06, 0x06, 0x06, 0x06, 0x06,
    0x06, 0x00, 0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x06, 0x05, 0x05, 0x00, 0x00, 0x00, 0x00, 0x06, 0x06,
    0x00, 0x00, 0x00, 0x00, 0x06, 0x06, 0x06, 0x05, 0x05, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x06, 0x06,
    0x06, 0x06, 0x06, 0x00, 0x00, 0x06, 0x06, 0x05, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x06, 0x05, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x06, 0x06,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x05, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x06, 0x05, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x06, 0x06,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x05, 0x06, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x06, 0x06, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x05, 0x05, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x05, 0x05, 0x05, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x05, 0x05, 0x05,
    0x00, 0x00, 0x00, 0x00, 0x05, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x05,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x05, 0x0B,
    0x00, 0x01, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0x01, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x0C, 0x02, 0x00, 0x00, 0x00, 0x3E, 0x33,
    0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2C, 0x20, 0x56, 0x65, 0x72, 0x73,
    0x69, 0x6F, 0x6E, 0x3D, 0x32, 0x2E, 0x30, 0x2E, 0x30, 0x2E, 0x30, 0x2C,
    0x20, 0x43, 0x75, 0x6C, 0x74, 0x75, 0x72, 0x65, 0x3D, 0x6E, 0x65, 0x75,
    0x74, 0x72, 0x61, 0x6C, 0x2C, 0x20, 0x50, 0x75, 0x62, 0x6C, 0x69, 0x63,
    0x4B, 0x65, 0x79, 0x54, 0x6F, 0x6B, 0x65, 0x6E, 0x3D, 0x6E, 0x75, 0x6C,
    0x6C, 0x05, 0x01, 0x00, 0x00, 0x00, 0x6B, 0x5F, 0x33, 0x44, 0x5F, 0x47,
    0x75, 0x61, 0x6E, 0x2E, 0x53, 0x6F, 0x75, 0x72, 0x63, 0x65, 0x4C, 0x69,
    0x73, 0x74, 0x60, 0x31, 0x5B, 0x5B, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75,
    0x61, 0x6E, 0x2E, 0x49, 0x6E, 0x64, 0x65, 0x78, 0x44, 0x61, 0x74, 0x61,
    0x2C, 0x20, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2C, 0x20, 0x56,
    0x65, 0x72, 0x73, 0x69, 0x6F, 0x6E, 0x3D, 0x32, 0x2E, 0x30, 0x2E, 0x30,
    0x2E, 0x30, 0x2C, 0x20, 0x43, 0x75, 0x6C, 0x74, 0x75, 0x72, 0x65, 0x3D,
    0x6E, 0x65, 0x75, 0x74, 0x72, 0x61, 0x6C, 0x2C, 0x20, 0x50, 0x75, 0x62,
    0x6C, 0x69, 0x63, 0x4B, 0x65, 0x79, 0x54, 0x6F, 0x6B, 0x65, 0x6E, 0x3D,
    0x6E, 0x75, 0x6C, 0x6C, 0x5D, 0x5D, 0x01, 0x00, 0x00, 0x00, 0x06, 0x6D,
    0x5F, 0x6C, 0x69, 0x73, 0x74, 0x03, 0x77, 0x53, 0x79, 0x73, 0x74, 0x65,
    0x6D, 0x2E, 0x43, 0x6F, 0x6C, 0x6C, 0x65, 0x63, 0x74, 0x69, 0x6F, 0x6E,
    0x73, 0x2E, 0x47, 0x65, 0x6E, 0x65, 0x72, 0x69, 0x63, 0x2E, 0x4C, 0x69,
    0x73, 0x74, 0x60, 0x31, 0x5B, 0x5B, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75,
    0x61, 0x6E, 0x2E, 0x49, 0x6E, 0x64, 0x65, 0x78, 0x44, 0x61, 0x74, 0x61,
    0x2C, 0x20, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2C, 0x20, 0x56,
    0x65, 0x72, 0x73, 0x69, 0x6F, 0x6E, 0x3D, 0x32, 0x2E, 0x30, 0x2E, 0x30,
    0x2E, 0x30, 0x2C, 0x20, 0x43, 0x75, 0x6C, 0x74, 0x75, 0x72, 0x65, 0x3D,
    0x6E, 0x65, 0x75, 0x74, 0x72, 0x61, 0x6C, 0x2C, 0x20, 0x50, 0x75, 0x62,
    0x6C, 0x69, 0x63, 0x4B, 0x65, 0x79, 0x54, 0x6F, 0x6B, 0x65, 0x6E, 0x3D,
    0x6E, 0x75, 0x6C, 0x6C, 0x5D, 0x5D, 0x02, 0x00, 0x00, 0x00, 0x09, 0x03,
    0x00, 0x00, 0x00, 0x04, 0x03, 0x00, 0x00, 0x00, 0x77, 0x53, 0x79, 0x73,
    0x74, 0x65, 0x6D, 0x2E, 0x43, 0x6F, 0x6C, 0x6C, 0x65, 0x63, 0x74, 0x69,
    0x6F, 0x6E, 0x73, 0x2E, 0x47, 0x65, 0x6E, 0x65, 0x72, 0x69, 0x63, 0x2E,
    0x4C, 0x69, 0x73, 0x74, 0x60, 0x31, 0x5B, 0x5B, 0x5F, 0x33, 0x44, 0x5F,
    0x47, 0x75, 0x61, 0x6E, 0x2E, 0x49, 0x6E, 0x64, 0x65, 0x78, 0x44, 0x61,
    0x74, 0x61, 0x2C, 0x20, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2C,
    0x20, 0x56, 0x65, 0x72, 0x73, 0x69, 0x6F, 0x6E, 0x3D, 0x32, 0x2E, 0x30,
    0x2E, 0x30, 0x2E, 0x30, 0x2C, 0x20, 0x43, 0x75, 0x6C, 0x74, 0x75, 0x72,
    0x65, 0x3D, 0x6E, 0x65, 0x75, 0x74, 0x72, 0x61, 0x6C, 0x2C, 0x20, 0x50,
    0x75, 0x62, 0x6C, 0x69, 0x63, 0x4B, 0x65, 0x79, 0x54, 0x6F, 0x6B, 0x65,
    0x6E, 0x3D, 0x6E, 0x75, 0x6C, 0x6C, 0x5D, 0x5D, 0x03, 0x00, 0x00, 0x00,
    0x06, 0x5F, 0x69, 0x74, 0x65, 0x6D, 0x73, 0x05, 0x5F, 0x73, 0x69, 0x7A,
    0x65, 0x08, 0x5F, 0x76, 0x65, 0x72, 0x73, 0x69, 0x6F, 0x6E, 0x04, 0x00,
    0x00, 0x14, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E, 0x49,
    0x6E, 0x64, 0x65, 0x78, 0x44, 0x61, 0x74, 0x61, 0x5B, 0x5D, 0x02, 0x00,
    0x00, 0x00, 0x08, 0x08, 0x09, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x02, 0x00, 0x00, 0x00, 0x07, 0x04, 0x00, 0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x04, 0x00, 0x00, 0x00, 0x04, 0x12, 0x5F, 0x33, 0x44,
    0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E, 0x49, 0x6E, 0x64, 0x65, 0x78, 0x44,
    0x61, 0x74, 0x61, 0x02, 0x00, 0x00, 0x00, 0x0D, 0x04, 0x0B, 0x00, 0x01,
    0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0x01, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x0C, 0x02, 0x00, 0x00, 0x00, 0x3E, 0x33, 0x44, 0x5F,
    0x47, 0x75, 0x61, 0x6E, 0x2C, 0x20, 0x56, 0x65, 0x72, 0x73, 0x69, 0x6F,
    0x6E, 0x3D, 0x32, 0x2E, 0x30, 0x2E, 0x30, 0x2E, 0x30, 0x2C, 0x20, 0x43,
    0x75, 0x6C, 0x74, 0x75, 0x72, 0x65, 0x3D, 0x6E, 0x65, 0x75, 0x74, 0x72,
    0x61, 0x6C, 0x2C, 0x20, 0x50, 0x75, 0x62, 0x6C, 0x69, 0x63, 0x4B, 0x65,
    0x79, 0x54, 0x6F, 0x6B, 0x65, 0x6E, 0x3D, 0x6E, 0x75, 0x6C, 0x6C, 0x05,
    0x01, 0x00, 0x00, 0x00, 0x1B, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61,
    0x6E, 0x2E, 0x43, 0x61, 0x72, 0x74, 0x6F, 0x6F, 0x6E, 0x45, 0x6C, 0x65,
    0x6D, 0x65, 0x6E, 0x74, 0x53, 0x61, 0x76, 0x65, 0x01, 0x00, 0x00, 0x00,
    0x06, 0x6D, 0x5F, 0x6C, 0x69, 0x73, 0x74, 0x03, 0x88, 0x01, 0x53, 0x79,
    0x73, 0x74, 0x65, 0x6D, 0x2E, 0x43, 0x6F, 0x6C, 0x6C, 0x65, 0x63, 0x74,
    0x69, 0x6F, 0x6E, 0x73, 0x2E, 0x47, 0x65, 0x6E, 0x65, 0x72, 0x69, 0x63,
    0x2E, 0x4C, 0x69, 0x73, 0x74, 0x60, 0x31, 0x5B, 0x5B, 0x5F, 0x33, 0x44,
    0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E, 0x43, 0x61, 0x72, 0x74, 0x6F, 0x6F,
    0x6E, 0x45, 0x6C, 0x65, 0x6D, 0x65, 0x6E, 0x74, 0x53, 0x61, 0x76, 0x65,
    0x2B, 0x45, 0x6C, 0x65, 0x6D, 0x65, 0x6E, 0x74, 0x2C, 0x20, 0x33, 0x44,
    0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2C, 0x20, 0x56, 0x65, 0x72, 0x73, 0x69,
    0x6F, 0x6E, 0x3D, 0x32, 0x2E, 0x30, 0x2E, 0x30, 0x2E, 0x30, 0x2C, 0x20,
    0x43, 0x75, 0x6C, 0x74, 0x75, 0x72, 0x65, 0x3D, 0x6E, 0x65, 0x75, 0x74,
    0x72, 0x61, 0x6C, 0x2C, 0x20, 0x50, 0x75, 0x62, 0x6C, 0x69, 0x63, 0x4B,
    0x65, 0x79, 0x54, 0x6F, 0x6B, 0x65, 0x6E, 0x3D, 0x6E, 0x75, 0x6C, 0x6C,
    0x5D, 0x5D, 0x02, 0x00, 0x00, 0x00, 0x09, 0x03, 0x00, 0x00, 0x00, 0x04,
    0x03, 0x00, 0x00, 0x00, 0x88, 0x01, 0x53, 0x79, 0x73, 0x74, 0x65, 0x6D,
    0x2E, 0x43, 0x6F, 0x6C, 0x6C, 0x65, 0x63, 0x74, 0x69, 0x6F, 0x6E, 0x73,
    0x2E, 0x47, 0x65, 0x6E, 0x65, 0x72, 0x69, 0x63, 0x2E, 0x4C, 0x69, 0x73,
    0x74, 0x60, 0x31, 0x5B, 0x5B, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61,
    0x6E, 0x2E, 0x43, 0x61, 0x72, 0x74, 0x6F, 0x6F, 0x6E, 0x45, 0x6C, 0x65,
    0x6D, 0x65, 0x6E, 0x74, 0x53, 0x61, 0x76, 0x65, 0x2B, 0x45, 0x6C, 0x65,
    0x6D, 0x65, 0x6E, 0x74, 0x2C, 0x20, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61,
    0x6E, 0x2C, 0x20, 0x56, 0x65, 0x72, 0x73, 0x69, 0x6F, 0x6E, 0x3D, 0x32,
    0x2E, 0x30, 0x2E, 0x30, 0x2E, 0x30, 0x2C, 0x20, 0x43, 0x75, 0x6C, 0x74,
    0x75, 0x72, 0x65, 0x3D, 0x6E, 0x65, 0x75, 0x74, 0x72, 0x61, 0x6C, 0x2C,
    0x20, 0x50, 0x75, 0x62, 0x6C, 0x69, 0x63, 0x4B, 0x65, 0x79, 0x54, 0x6F,
    0x6B, 0x65, 0x6E, 0x3D, 0x6E, 0x75, 0x6C, 0x6C, 0x5D, 0x5D, 0x03, 0x00,
    0x00, 0x00, 0x06, 0x5F, 0x69, 0x74, 0x65, 0x6D, 0x73, 0x05, 0x5F, 0x73,
    0x69, 0x7A, 0x65, 0x08, 0x5F, 0x76, 0x65, 0x72, 0x73, 0x69, 0x6F, 0x6E,
    0x04, 0x00, 0x00, 0x25, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E,
    0x2E, 0x43, 0x61, 0x72, 0x74, 0x6F, 0x6F, 0x6E, 0x45, 0x6C, 0x65, 0x6D,
    0x65, 0x6E, 0x74, 0x53, 0x61, 0x76, 0x65, 0x2B, 0x45, 0x6C, 0x65, 0x6D,
    0x65, 0x6E, 0x74, 0x5B, 0x5D, 0x02, 0x00, 0x00, 0x00, 0x08, 0x08, 0x09,
    0x04, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00,
    0x07, 0x04, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x04, 0x00,
    0x00, 0x00, 0x04, 0x23, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E,
    0x2E, 0x43, 0x61, 0x72, 0x74, 0x6F, 0x6F, 0x6E, 0x45, 0x6C, 0x65, 0x6D,
    0x65, 0x6E, 0x74, 0x53, 0x61, 0x76, 0x65, 0x2B, 0x45, 0x6C, 0x65, 0x6D,
    0x65, 0x6E, 0x74, 0x02, 0x00, 0x00, 0x00, 0x09, 0x05, 0x00, 0x00, 0x00,
    0x0D, 0x03, 0x05, 0x05, 0x00, 0x00, 0x00, 0x23, 0x5F, 0x33, 0x44, 0x5F,
    0x47, 0x75, 0x61, 0x6E, 0x2E, 0x43, 0x61, 0x72, 0x74, 0x6F, 0x6F, 0x6E,
    0x45, 0x6C, 0x65, 0x6D, 0x65, 0x6E, 0x74, 0x53, 0x61, 0x76, 0x65, 0x2B,
    0x45, 0x6C, 0x65, 0x6D, 0x65, 0x6E, 0x74, 0x06, 0x00, 0x00, 0x00, 0x06,
    0x6D, 0x5F, 0x6E, 0x61, 0x6D, 0x65, 0x0C, 0x6D, 0x5F, 0x73, 0x63, 0x72,
    0x69, 0x70, 0x74, 0x54, 0x65, 0x78, 0x74, 0x07, 0x6D, 0x5F, 0x69, 0x73,
    0x52, 0x74, 0x66, 0x0B, 0x6D, 0x5F, 0x75, 0x73, 0x65, 0x53, 0x63, 0x72,
    0x69, 0x70, 0x74, 0x07, 0x6D, 0x5F, 0x69, 0x73, 0x55, 0x73, 0x65, 0x08,
    0x6D, 0x5F, 0x66, 0x72, 0x61, 0x6D, 0x65, 0x73, 0x01, 0x01, 0x00, 0x00,
    0x00, 0x04, 0x01, 0x01, 0x01, 0x16, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75,
    0x61, 0x6E, 0x2E, 0x43, 0x61, 0x72, 0x74, 0x6F, 0x6F, 0x6E, 0x46, 0x72,
    0x61, 0x6D, 0x65, 0x73, 0x02, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00,
    0x06, 0x06, 0x00, 0x00, 0x00, 0x05, 0x48, 0x65, 0x6C, 0x6C, 0x6F, 0x06,
    0x07, 0x00, 0x00, 0x00, 0x14, 0x65, 0x76, 0x65, 0x6E, 0x74, 0x20, 0x4F,
    0x6E, 0x4C, 0x6F, 0x6F, 0x70, 0x0D, 0x0A, 0x7B, 0x0D, 0x0A, 0x0D, 0x0A,
    0x7D, 0x00, 0x00, 0x01, 0x09, 0x08, 0x00, 0x00, 0x00, 0x05, 0x08, 0x00,
    0x00, 0x00, 0x16, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E,
    0x43, 0x61, 0x72, 0x74, 0x6F, 0x6F, 0x6E, 0x46, 0x72, 0x61, 0x6D, 0x65,
    0x73, 0x04, 0x00, 0x00, 0x00, 0x0C, 0x6D, 0x5F, 0x66, 0x72, 0x61, 0x6D,
    0x65, 0x43, 0x6F, 0x75, 0x6E, 0x74, 0x07, 0x6D, 0x5F, 0x64, 0x65, 0x6C,
    0x61, 0x79, 0x06, 0x6D, 0x5F, 0x6C, 0x6F, 0x6F, 0x70, 0x09, 0x6D, 0x5F,
    0x65, 0x6C, 0x65, 0x6D, 0x65, 0x6E, 0x74, 0x00, 0x00, 0x00, 0x03, 0x08,
    0x08, 0x08, 0x7A, 0x53, 0x79, 0x73, 0x74, 0x65, 0x6D, 0x2E, 0x43, 0x6F,
    0x6C, 0x6C, 0x65, 0x63, 0x74, 0x69, 0x6F, 0x6E, 0x73, 0x2E, 0x47, 0x65,
    0x6E, 0x65, 0x72, 0x69, 0x63, 0x2E, 0x4C, 0x69, 0x73, 0x74, 0x60, 0x31,
    0x5B, 0x5B, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E, 0x46,
    0x72, 0x61, 0x6D, 0x65, 0x45, 0x6C, 0x65, 0x6D, 0x65, 0x6E, 0x74, 0x2C,
    0x20, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2C, 0x20, 0x56, 0x65,
    0x72, 0x73, 0x69, 0x6F, 0x6E, 0x3D, 0x32, 0x2E, 0x30, 0x2E, 0x30, 0x2E,
    0x30, 0x2C, 0x20, 0x43, 0x75, 0x6C, 0x74, 0x75, 0x72, 0x65, 0x3D, 0x6E,
    0x65, 0x75, 0x74, 0x72, 0x61, 0x6C, 0x2C, 0x20, 0x50, 0x75, 0x62, 0x6C,
    0x69, 0x63, 0x4B, 0x65, 0x79, 0x54, 0x6F, 0x6B, 0x65, 0x6E, 0x3D, 0x6E,
    0x75, 0x6C, 0x6C, 0x5D, 0x5D, 0x02, 0x00, 0x00, 0x00, 0x0A, 0x00, 0x00,
    0x00, 0xC8, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x09, 0x09, 0x00,
    0x00, 0x00, 0x04, 0x09, 0x00, 0x00, 0x00, 0x7A, 0x53, 0x79, 0x73, 0x74,
    0x65, 0x6D, 0x2E, 0x43, 0x6F, 0x6C, 0x6C, 0x65, 0x63, 0x74, 0x69, 0x6F,
    0x6E, 0x73, 0x2E, 0x47, 0x65, 0x6E, 0x65, 0x72, 0x69, 0x63, 0x2E, 0x4C,
    0x69, 0x73, 0x74, 0x60, 0x31, 0x5B, 0x5B, 0x5F, 0x33, 0x44, 0x5F, 0x47,
    0x75, 0x61, 0x6E, 0x2E, 0x46, 0x72, 0x61, 0x6D, 0x65, 0x45, 0x6C, 0x65,
    0x6D, 0x65, 0x6E, 0x74, 0x2C, 0x20, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61,
    0x6E, 0x2C, 0x20, 0x56, 0x65, 0x72, 0x73, 0x69, 0x6F, 0x6E, 0x3D, 0x32,
    0x2E, 0x30, 0x2E, 0x30, 0x2E, 0x30, 0x2C, 0x20, 0x43, 0x75, 0x6C, 0x74,
    0x75, 0x72, 0x65, 0x3D, 0x6E, 0x65, 0x75, 0x74, 0x72, 0x61, 0x6C, 0x2C,
    0x20, 0x50, 0x75, 0x62, 0x6C, 0x69, 0x63, 0x4B, 0x65, 0x79, 0x54, 0x6F,
    0x6B, 0x65, 0x6E, 0x3D, 0x6E, 0x75, 0x6C, 0x6C, 0x5D, 0x5D, 0x03, 0x00,
    0x00, 0x00, 0x06, 0x5F, 0x69, 0x74, 0x65, 0x6D, 0x73, 0x05, 0x5F, 0x73,
    0x69, 0x7A, 0x65, 0x08, 0x5F, 0x76, 0x65, 0x72, 0x73, 0x69, 0x6F, 0x6E,
    0x04, 0x00, 0x00, 0x17, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E,
    0x2E, 0x46, 0x72, 0x61, 0x6D, 0x65, 0x45, 0x6C, 0x65, 0x6D, 0x65, 0x6E,
    0x74, 0x5B, 0x5D, 0x02, 0x00, 0x00, 0x00, 0x08, 0x08, 0x09, 0x0A, 0x00,
    0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x07, 0x0A,
    0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x04, 0x00, 0x00, 0x00,
    0x04, 0x15, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E, 0x46,
    0x72, 0x61, 0x6D, 0x65, 0x45, 0x6C, 0x65, 0x6D, 0x65, 0x6E, 0x74, 0x02,
    0x00, 0x00, 0x00, 0x09, 0x0B, 0x00, 0x00, 0x00, 0x0D, 0x03, 0x05, 0x0B,
    0x00, 0x00, 0x00, 0x15, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E,
    0x2E, 0x46, 0x72, 0x61, 0x6D, 0x65, 0x45, 0x6C, 0x65, 0x6D, 0x65, 0x6E,
    0x74, 0x02, 0x00, 0x00, 0x00, 0x03, 0x6D, 0x5F, 0x74, 0x0C, 0x6D, 0x5F,
    0x70, 0x72, 0x6F, 0x70, 0x65, 0x72, 0x74, 0x69, 0x65, 0x73, 0x04, 0x03,
    0x21, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E, 0x46, 0x72,
    0x61, 0x6D, 0x65, 0x45, 0x6C, 0x65, 0x6D, 0x65, 0x6E, 0x74, 0x2B, 0x45,
    0x6C, 0x65, 0x6D, 0x65, 0x6E, 0x74, 0x54, 0x79, 0x70, 0x65, 0x02, 0x00,
    0x00, 0x00, 0x7B, 0x53, 0x79, 0x73, 0x74, 0x65, 0x6D, 0x2E, 0x43, 0x6F,
    0x6C, 0x6C, 0x65, 0x63, 0x74, 0x69, 0x6F, 0x6E, 0x73, 0x2E, 0x47, 0x65,
    0x6E, 0x65, 0x72, 0x69, 0x63, 0x2E, 0x4C, 0x69, 0x73, 0x74, 0x60, 0x31,
    0x5B, 0x5B, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E, 0x46,
    0x72, 0x61, 0x6D, 0x65, 0x50, 0x72, 0x6F, 0x70, 0x65, 0x72, 0x74, 0x79,
    0x2C, 0x20, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2C, 0x20, 0x56,
    0x65, 0x72, 0x73, 0x69, 0x6F, 0x6E, 0x3D, 0x32, 0x2E, 0x30, 0x2E, 0x30,
    0x2E, 0x30, 0x2C, 0x20, 0x43, 0x75, 0x6C, 0x74, 0x75, 0x72, 0x65, 0x3D,
    0x6E, 0x65, 0x75, 0x74, 0x72, 0x61, 0x6C, 0x2C, 0x20, 0x50, 0x75, 0x62,
    0x6C, 0x69, 0x63, 0x4B, 0x65, 0x79, 0x54, 0x6F, 0x6B, 0x65, 0x6E, 0x3D,
    0x6E, 0x75, 0x6C, 0x6C, 0x5D, 0x5D, 0x02, 0x00, 0x00, 0x00, 0x05, 0xF4,
    0xFF, 0xFF, 0xFF, 0x21, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E,
    0x2E, 0x46, 0x72, 0x61, 0x6D, 0x65, 0x45, 0x6C, 0x65, 0x6D, 0x65, 0x6E,
    0x74, 0x2B, 0x45, 0x6C, 0x65, 0x6D, 0x65, 0x6E, 0x74, 0x54, 0x79, 0x70,
    0x65, 0x01, 0x00, 0x00, 0x00, 0x07, 0x76, 0x61, 0x6C, 0x75, 0x65, 0x5F,
    0x5F, 0x00, 0x08, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x09,
    0x0D, 0x00, 0x00, 0x00, 0x04, 0x0D, 0x00, 0x00, 0x00, 0x7B, 0x53, 0x79,
    0x73, 0x74, 0x65, 0x6D, 0x2E, 0x43, 0x6F, 0x6C, 0x6C, 0x65, 0x63, 0x74,
    0x69, 0x6F, 0x6E, 0x73, 0x2E, 0x47, 0x65, 0x6E, 0x65, 0x72, 0x69, 0x63,
    0x2E, 0x4C, 0x69, 0x73, 0x74, 0x60, 0x31, 0x5B, 0x5B, 0x5F, 0x33, 0x44,
    0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E, 0x46, 0x72, 0x61, 0x6D, 0x65, 0x50,
    0x72, 0x6F, 0x70, 0x65, 0x72, 0x74, 0x79, 0x2C, 0x20, 0x33, 0x44, 0x5F,
    0x47, 0x75, 0x61, 0x6E, 0x2C, 0x20, 0x56, 0x65, 0x72, 0x73, 0x69, 0x6F,
    0x6E, 0x3D, 0x32, 0x2E, 0x30, 0x2E, 0x30, 0x2E, 0x30, 0x2C, 0x20, 0x43,
    0x75, 0x6C, 0x74, 0x75, 0x72, 0x65, 0x3D, 0x6E, 0x65, 0x75, 0x74, 0x72,
    0x61, 0x6C, 0x2C, 0x20, 0x50, 0x75, 0x62, 0x6C, 0x69, 0x63, 0x4B, 0x65,
    0x79, 0x54, 0x6F, 0x6B, 0x65, 0x6E, 0x3D, 0x6E, 0x75, 0x6C, 0x6C, 0x5D,
    0x5D, 0x03, 0x00, 0x00, 0x00, 0x06, 0x5F, 0x69, 0x74, 0x65, 0x6D, 0x73,
    0x05, 0x5F, 0x73, 0x69, 0x7A, 0x65, 0x08, 0x5F, 0x76, 0x65, 0x72, 0x73,
    0x69, 0x6F, 0x6E, 0x04, 0x00, 0x00, 0x18, 0x5F, 0x33, 0x44, 0x5F, 0x47,
    0x75, 0x61, 0x6E, 0x2E, 0x46, 0x72, 0x61, 0x6D, 0x65, 0x50, 0x72, 0x6F,
    0x70, 0x65, 0x72, 0x74, 0x79, 0x5B, 0x5D, 0x02, 0x00, 0x00, 0x00, 0x08,
    0x08, 0x09, 0x0E, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x13, 0x00,
    0x00, 0x00, 0x07, 0x0E, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00,
    0x08, 0x00, 0x00, 0x00, 0x04, 0x16, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75,
    0x61, 0x6E, 0x2E, 0x46, 0x72, 0x61, 0x6D, 0x65, 0x50, 0x72, 0x6F, 0x70,
    0x65, 0x72, 0x74, 0x79, 0x02, 0x00, 0x00, 0x00, 0x09, 0x0F, 0x00, 0x00,
    0x00, 0x0D, 0x07, 0x05, 0x0F, 0x00, 0x00, 0x00, 0x13, 0x5F, 0x33, 0x44,
    0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E, 0x46, 0x72, 0x61, 0x6D, 0x65, 0x47,
    0x72, 0x61, 0x70, 0x68, 0x0E, 0x00, 0x00, 0x00, 0x09, 0x67, 0x72, 0x61,
    0x70, 0x68, 0x4E, 0x61, 0x6D, 0x65, 0x0B, 0x70, 0x61, 0x6C, 0x6C, 0x65,
    0x74, 0x65, 0x4E, 0x61, 0x6D, 0x65, 0x06, 0x73, 0x74, 0x61, 0x72, 0x74,
    0x58, 0x06, 0x73, 0x74, 0x61, 0x72, 0x74, 0x59, 0x06, 0x73, 0x74, 0x61,
    0x72, 0x74, 0x5A, 0x04, 0x65, 0x6E, 0x64, 0x58, 0x04, 0x65, 0x6E, 0x64,
    0x59, 0x04, 0x65, 0x6E, 0x64, 0x5A, 0x0A, 0x73, 0x74, 0x61, 0x72, 0x74,
    0x41, 0x6E, 0x67, 0x6C, 0x65, 0x08, 0x65, 0x6E, 0x64, 0x41, 0x6E, 0x67,
    0x6C, 0x65, 0x04, 0x61, 0x78, 0x69, 0x73, 0x09, 0x67, 0x72, 0x61, 0x70,
    0x68, 0x54, 0x79, 0x70, 0x65, 0x0C, 0x6D, 0x5F, 0x73, 0x74, 0x61, 0x72,
    0x74, 0x49, 0x6E, 0x64, 0x65, 0x78, 0x0A, 0x6D, 0x5F, 0x65, 0x6E, 0x64,
    0x49, 0x6E, 0x64, 0x65, 0x78, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x04, 0x04, 0x00, 0x00, 0x08, 0x08, 0x08, 0x08, 0x08,
    0x08, 0x07, 0x07, 0x1E, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E,
    0x2E, 0x46, 0x72, 0x61, 0x6D, 0x65, 0x47, 0x72, 0x61, 0x70, 0x68, 0x2B,
    0x52, 0x6F, 0x74, 0x61, 0x74, 0x65, 0x41, 0x78, 0x69, 0x73, 0x02, 0x00,
    0x00, 0x00, 0x1D, 0x5F, 0x33, 0x44, 0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E,
    0x46, 0x72, 0x61, 0x6D, 0x65, 0x47, 0x72, 0x61, 0x70, 0x68, 0x2B, 0x47,
    0x72, 0x61, 0x70, 0x68, 0x54, 0x79, 0x70, 0x65, 0x02, 0x00, 0x00, 0x00,
    0x08, 0x08, 0x02, 0x00, 0x00, 0x00, 0x06, 0x10, 0x00, 0x00, 0x00, 0x05,
    0x38, 0x78, 0x38, 0x78, 0x38, 0x06, 0x11, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x05, 0xEE, 0xFF, 0xFF, 0xFF, 0x1E, 0x5F, 0x33, 0x44,
    0x5F, 0x47, 0x75, 0x61, 0x6E, 0x2E, 0x46, 0x72, 0x61, 0x6D, 0x65, 0x47,
    0x72, 0x61, 0x70, 0x68, 0x2B, 0x52, 0x6F, 0x74, 0x61, 0x74, 0x65, 0x41,
    0x78, 0x69, 0x73, 0x01, 0x00, 0x00, 0x00, 0x07, 0x76, 0x61, 0x6C, 0x75,
    0x65, 0x5F, 0x5F, 0x00, 0x08, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x05, 0xED, 0xFF, 0xFF, 0xFF, 0x1D, 0x5F, 0x33, 0x44, 0x5F, 0x47,
    0x75, 0x61, 0x6E, 0x2E, 0x46, 0x72, 0x61, 0x6D, 0x65, 0x47, 0x72, 0x61,
    0x70, 0x68, 0x2B, 0x47, 0x72, 0x61, 0x70, 0x68, 0x54, 0x79, 0x70, 0x65,
    0x01, 0x00, 0x00, 0x00, 0x07, 0x76, 0x61, 0x6C, 0x75, 0x65, 0x5F, 0x5F,
    0x00, 0x08, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x09, 0x00, 0x00, 0x00, 0x0B
];

// Convert hexadecimal values to binary
const binaryData = Buffer.from(hexArray);

// Write binary data to file
fs.writeFile('output.bin', binaryData, (err) => {
    if (err) throw err;
    console.log('Binary file saved successfully.');
});