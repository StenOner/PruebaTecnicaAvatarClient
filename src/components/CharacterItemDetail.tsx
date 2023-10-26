'use client'

import CharacterDetailed, { BASE_CHARACTER_DETAILED } from '@/models/CharacterDetailed'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import ImageMediaContent from './ui/ImageMediaContent'

const CharacterItemDetail: React.FC<{ charactedID: string }> = ({ charactedID }) => {
  const [character, setCharacter] = useState<CharacterDetailed>(BASE_CHARACTER_DETAILED)
  const formatedAbout = character.about.split('\n').filter(newLine => newLine.trim() !== '')

  const fetchData = useCallback(async () => {
    const { data } = await axios.get<{ data: CharacterDetailed }>(`https://api.jikan.moe/v4/characters/${charactedID}/full`)
    setCharacter(data.data)
  }, [charactedID])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const characterNameSection = (
    <div className='flex flex-col items-start justify-center mr-2'>
      <span className='text-2xl text-center'>
        {character.name}
      </span>
    </div>
  )

  const characterNicknamesSection = (
    <div className='flex flex-col space-y-2'>
      <div>
        <span className='font-semibold'>
          Nicknames
        </span>
        <hr />
      </div>
      <ul className='list-inside list-disc'>
        {character.nicknames.map(nickname => (
          <li key={`${character.mal_id}-${nickname}`} className='text-sm overflow-hidden whitespace-nowrap'>
            {nickname}
          </li>
        ))}
      </ul>
    </div>
  )

  const characterInfoSection = (
    <div className='flex sm:w-[20%] md:w-[15%]'>
      <div className='flex flex-col w-full space-y-2'>
        <div className='w-full'>
          <ImageMediaContent
            src={character.images.webp.image_url}
            className='w-full max-h-[26rem]'
            alt='Anime image' />
        </div>
        {character.nicknames.length > 0 && characterNicknamesSection}
      </div>
    </div>
  )

  const voiceActorsSection = (
    <div>
      asd
    </div>
  )

  const characterMainSection = (
    <div className='flex flex-col w-full space-y-2'>
      <div className='flex flex-col'>
        <div className='flex items-center space-x-1'>
          <span className='text-lg font-semibold'>
            {character.name}
          </span>
          <span className='text-sm'>
            ({character.name_kanji})
          </span>
        </div>
        <hr />
      </div>
      <div className='flex flex-col w-full'>
        {formatedAbout.map(newLine => (
          <text key={`${character.mal_id}-${Math.random()}`} className='text-sm text-justify'>
            {newLine.indexOf(':') > 0 && (
              <>
                <b>{newLine.split(':')[0]}:</b>
                {newLine.split(':')[1]}
              </>
            ) || (
              <>
                {newLine}
              </>
            )}
          </text>
        ))}
      </div>
      <div className='flex flex-col'>
        <span className='text-lg font-semibold'>
          Voice Actors
        </span>
        <hr />
      </div>
      {voiceActorsSection}
    </div>
  )
  

  return (
    <div className='flex flex-col w-full space-y-2'>
      <div className='flex flex-row'>
        {characterNameSection}
      </div>
      <hr />
      <div className='flex w-full space-x-4'>
        {characterInfoSection}
        {characterMainSection}
      </div>
    </div>
  )
}

export default CharacterItemDetail