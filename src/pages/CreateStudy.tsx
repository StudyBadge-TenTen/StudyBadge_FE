import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudyStore } from '../store/study-store';
import axios from 'axios';
import { koreanRegions } from '../components/common/KoreanRegions';

const PENALTY_SYSTEM = `
1. 지각 시 벌금: 5,000원
2. 불참 시 벌금: 10,000원
3. 과제 미제출 시 벌금: 5,000원
4. 우수 참여자 보상: 매달 벌금의 50%를 우수 참여자에게 지급
5. 나머지 벌금은 스터디 종료 후 회식비로 사용
`;

const CreateStudy: React.FC = () => {
    const study = useStudyStore();
    const [selectedRegion, setSelectedRegion] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/studies', study);
            console.log('Study created:', response.data);
            study.resetForm();
            navigate('/');
        } catch (error) {
            console.error('Failed to create study:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
            <div className="mb-4">
                <label className="block mb-2">스터디명 *</label>
                <input
                    type="text"
                    value={study.title}
                    onChange={(e) => study.setField('title', e.target.value)}
                    className="w-full p-2 border rounded"
                    maxLength={30}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">소개 *</label>
                <textarea
                    value={study.description}
                    onChange={(e) => study.setField('description', e.target.value)}
                    className="w-full p-2 border rounded"
                    maxLength={1000}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">스터디 카테고리 *</label>
                <select
                    value={study.category}
                    onChange={(e) => study.setField('category', e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">선택해주세요</option>
                    <option value="컴퓨터/IT/개발">컴퓨터/IT/개발</option>
                    <option value="언어/어학">언어/어학</option>
                    <option value="취업/이직">취업/이직</option>
                    <option value="자기계발">자기계발</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-2">진행 방식 *</label>
                <div>
                    <label className="inline-flex items-center mr-4">
                        <input
                            type="radio"
                            value="offline"
                            checked={study.meetingType === 'offline'}
                            onChange={() => study.setField('meetingType', 'offline')}
                            className="mr-2"
                        />
                        오프라인
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            value="online"
                            checked={study.meetingType === 'online'}
                            onChange={() => study.setField('meetingType', 'online')}
                            className="mr-2"
                        />
                        온라인
                    </label>
                </div>
            </div>

            {study.meetingType === 'offline' && (
                <div className="mb-4">
                    <label className="block mb-2">지역 *</label>
                    <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        required
                    >
                        <option value="">시/도 선택</option>
                        {koreanRegions.map((region) => (
                            <option key={region.name} value={region.name}>
                                {region.name}
                            </option>
                        ))}
                    </select>
                    {selectedRegion && (
                        <select
                            value={study.location}
                            onChange={(e) => study.setField('location', e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">구/군 선택</option>
                            {koreanRegions
                                .find((region) => region.name === selectedRegion)
                                ?.districts.map((district) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))}
                        </select>
                    )}
                </div>
            )}

            <div className="mb-4 flex gap-4">
                <div>
                    <label className="block mb-2">시작 *</label>
                    <input
                        type="date"
                        value={study.startDate}
                        onChange={(e) => study.setField('startDate', e.target.value)}
                        className="p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">종료 *</label>
                    <input
                        type="date"
                        value={study.endDate}
                        onChange={(e) => study.setField('endDate', e.target.value)}
                        className="p-2 border rounded"
                        required
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block mb-2">인원 *</label>
                <div className="flex items-center">
                    <span className="mr-2">모집인원</span>
                    <input
                        type="number"
                        value={study.maxParticipants}
                        onChange={(e) => study.setField('maxParticipants', Math.max(3, parseInt(e.target.value)))}
                        className="w-24 p-2 border rounded"
                        min="3"
                        required
                    />
                    <span className="ml-2">명</span>
                </div>
                <p className="text-blue-600 text-sm mt-1">최소인원은 스터디장 포함 3명입니다. 모집인원을 3명 이상으로 설정해주세요.</p>
            </div>

            <div className="mb-4">
                <label className="block mb-2">예치금 *</label>
                <div className="flex items-center">
                    <input
                        type="number"
                        value={study.fee}
                        onChange={(e) => study.setField('fee', parseInt(e.target.value))}
                        className="w-24 p-2 border rounded"
                        min="10000"
                        max="50000"
                        step="1000"
                        required
                    />
                    <span className="ml-2">원</span>
                </div>
                <p className="text-blue-600 text-sm mt-1">예치금은 10,000원 ~ 50,000원 사이로 설정 가능합니다.</p>
            </div>

            <div className="mb-4">
                <label className="block mb-2">소통 링크</label>
                <input
                    type='text'
                    value={study.link}
                    onChange={(e) => study.setField('link', e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="스터디 내 소통을 위한 카카오톡 오픈채팅 링크를 입력해주세요."
                />
            </div>

            <div className="mb-8">
                <label className="block mb-3 text-lg font-semibold">
                    벌금/보상 시스템 안내
                </label>
                <textarea
                    className="w-full p-4 border rounded min-h-[200px] resize-y text-base"
                    value={PENALTY_SYSTEM}
                    readOnly
                />
            </div>

            <div className="flex justify-between mt-8">
                <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 rounded"
                    onClick={() => navigate('/')}
                >
                    취소
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 btn-blue text-white rounded" onClick={() => navigate('/')}
                >
                    스터디 생성
                </button>
            </div>
        </form>
    );
};

export default CreateStudy;